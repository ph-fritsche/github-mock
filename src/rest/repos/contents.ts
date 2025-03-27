import {HttpError, RestEndpoint, StoreObjectProps} from '../../index.ts'

export const reposContentsGet: RestEndpoint<'GET /repos/{owner}/{repo}/contents/{path}'> = github => async params => {
    const repo = github.findRepository(params.owner, params.repo)
    const ref = params.ref
        ? github.findRef(repo, params.ref)
        : github.get(repo)?.defaultBranchRef
    const entry = github.get(github.getTreeEntry(ref, params.path))
    if (!entry) {
        throw new HttpError(404)
    }

    const repoNameWithOwner = `${params.owner.toLowerCase()}/${params.repo.toLowerCase()}`
    const refData = github.get(ref)

    if (github.is$RefType(entry.object, 'Tree')) {
        return (github.get(entry.object)?.entries ?? []).map(e => {
            const childEntry = github.get(e)
            return (childEntry && describeTreeEntry(childEntry))!
        })
    }

    if (github.is$RefType(entry.object, 'Blob')) {
        const blob = github.get(entry.object)
        return {
            ...describeTreeEntry(entry),
            type: 'file',
            encoding: 'base64',
            content: Buffer.from(blob?.text ?? '').toString('base64'),
        }
    }

    throw new HttpError(501)

    function describeTreeEntry(entry: StoreObjectProps<'TreeEntry'>) {
        const gitType = (github.is$RefType(entry.object, 'Blob') && 'blob')
          || (github.is$RefType(entry.object, 'Tree') && 'tree')
          || 'unknown'
        const blob = github.is$RefType(entry.object, 'Blob') ? github.get(entry.object) : undefined
        return {
            name: entry.name ?? '',
            path: entry.path ?? '',
            sha: entry.oid,
            type: entry.type as 'file' | 'dir' | 'submodule' | 'symlink',
            size: blob?.byteSize ?? blob?.text?.length ?? 0,
            url: `${github.apiOrigin}/repos/${repoNameWithOwner}/contents/${entry.path}?ref=${refData?.name}`,
            html_url: `${github.htmlOrigin}/repos/${repoNameWithOwner}/${gitType}/${refData?.name}/${entry.path}`,
            git_url: `${github.apiOrigin}/repos/${repoNameWithOwner}/git/${gitType}s/${entry.oid}`,
            download_url: gitType === 'blob'
                ? `${github.contentOrigin}/${repoNameWithOwner}/${refData?.name}/${entry.path}`
                : null,
            _links: {
                self: `${github.apiOrigin}/repos/${repoNameWithOwner}/contents/${entry.path}?ref=${refData?.name}`,
                html: `${github.htmlOrigin}/repos/${repoNameWithOwner}/${gitType}/${refData?.name}/${entry.path}`,
                git: `${github.apiOrigin}/repos/${repoNameWithOwner}/git/${gitType}s/${entry.oid}`,
            },
        }
    }
}
