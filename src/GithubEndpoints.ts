import {MIMEType} from 'node:util'
import {ExecutionResult, graphql} from 'graphql/index.js'
import {Endpoints, OctokitResponse} from '@octokit/types'
import {GithubStore} from './GithubStore.ts'
import {RestEndpoint} from './types.ts'

export class GithubEndpoints {
    constructor(
        readonly store: GithubStore,
        protected readonly rest: {[k in keyof Endpoints]?: RestEndpoint<k>} = {},
    ) {}

    graphql<T>(
        query: string,
        variables?: Record<string, unknown>,
    ) {
        return graphql({
            schema: this.store.schema,
            source: query,
            variableValues: variables,
        }) as Promise<ExecutionResult<T>>
    }

    *routes(): Generator<{
        name: string
        match: (method: string, url: URL) => boolean
        handle: (method: string, url: URL, headers: Headers, body?: string) => Promise<OctokitResponse<unknown> | undefined>
    }> {
        yield {
            name: this.store.apiOrigin + ' : POST /graphql',
            match: (method, url) => {
                return url.origin === this.store.apiOrigin
                  && method.toUpperCase() === 'POST'
                  && url.pathname === '/graphql'
            },
            handle: async (method, url, headers, body) => {
                const p = this.getRequestBodyData(headers, body)
                if (p) {
                    return this.createResponse({
                        url: url.pathname,
                        status: 200,
                        data: await this.graphql(p.query as string, p.variables as Record<string, unknown>),
                    })
                }
            },
        }
        for (const key in this.rest) {
            const fn: RestEndpoint<keyof Endpoints> | undefined = this.rest[key]
            if (typeof fn !== 'function') {
                continue
            }
            const [method, path] = key.split(' ')
            const pathRegexp = new RegExp(path.replaceAll(/\{(\w+)\}/g, '(?<$1>[-\\w\\/%]+)'))
            yield {
                name: this.store.apiOrigin + ' : ' + key,
                match: (m, url) => {
                    return m.toUpperCase() === method
                      && url.origin === this.store.apiOrigin
                      && pathRegexp.test(url.pathname)
                },
                handle: async (m, url, headers, body) => {
                    const bodyData = this.getRequestBodyData(headers, body)
                    const queryParams = Object.fromEntries(url.searchParams.entries() ?? [])
                    const pathParams = pathRegexp.exec(url.pathname)?.groups
                    for (const i in pathParams) {
                        pathParams[i] = decodeURIComponent(pathParams[i])
                    }
                    try {
                        const data = await fn(this.store)({
                            ...bodyData,
                            ...queryParams,
                            ...pathParams,
                        } as never)
                        return this.createResponse({
                            url: url.pathname,
                            status: 200,
                            data,
                        })
                    } catch (e) {
                        if (e instanceof HttpError) {
                            return this.createResponse({
                                url: url.pathname,
                                status: e.status,
                                data: undefined,
                            })
                        }
                        throw e
                    }
                },
            }
        }
    }

    protected createResponse<T>({
        url,
        status = 200,
        data,
    }: {
        url: string
        status?: number
        data: T
    }): OctokitResponse<T> {
        return {
            url,
            status,
            headers: {
                'x-ratelimit-limit': String(this.rateLimit.limit),
                'x-ratelimit-remaining': String(this.rateLimit.remaining--),
                'x-ratelimit-reset': String(this.rateLimit.resets),
            },
            data,
        }
    }

    protected rateLimit = {
        limit: 4567,
        remaining: 1234,
        resets: Date.UTC(2031, 2, 3, 4, 5, 6) / 1000,
    }

    protected getMimeType(headers?: Headers) {
        try {
            return new MIMEType(headers?.get('content-type') ?? '')
        } catch {
            return undefined
        }
    }

    protected getRequestBodyData(headers: Headers, body?: string) {
        const contentType = this.getMimeType(headers)
        if (typeof body === 'string'
          && contentType?.type === 'application'
          && contentType.subtype === 'json'
        ) {
            const buf = Buffer.from(body)
            const data = JSON.parse(buf.toString())
            if (typeof data === 'object') {
                return data as Record<string, unknown>
            }
        }
    }
}

export class HttpError extends Error {
    name: 'HttpError'
    constructor(
        readonly status: number,
        text?: string,
    ) {
        super(String(status) + (text ? ' ' + text : ''))
    }
}
