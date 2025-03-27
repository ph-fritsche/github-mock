import {HttpError, RestEndpoint} from '../index.ts'

export const usersGet: RestEndpoint<'GET /users/{username}'> = github => async params => {
    const ref = github.find(['User', 'Organization', 'Bot'], obj => obj.login === params.username)
    if (!ref) {
        throw new HttpError(404)
    }
    return github.getComponent('public-user', ref)
}
