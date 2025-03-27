import {RestSchemaComponent} from '../index.ts'

export const publicUser: RestSchemaComponent<'public-user'> = github => github.with$RefType(
    ['User', 'Organization'],
    (user, ref) => ({
        // simple-user
        avatar_url: user.avatarUrl ?? `${github.avatarsOrigin}/placeholder/123456`,
        events_url: `${github.apiOrigin}/users/${user.login}/events{/privacy}`,
        followers_url: `${github.apiOrigin}/users/${user.login}/followers`,
        following_url: `${github.apiOrigin}/users/${user.login}/following{/other_user}`,
        gists_url: `${github.apiOrigin}/users/${user.login}/gists{/gist_id}`,
        gravatar_id: ``,
        html_url: `${github.htmlOrigin}/apps/github-actions`,
        id: user.databaseId ?? 123,
        login: user.login ?? 'anonymous',
        node_id: ref.$ref.key,
        organizations_url: `${github.apiOrigin}/users/${user.login}/orgs`,
        received_events_url: `${github.apiOrigin}/users/${user.login}/received_events`,
        repos_url: `${github.apiOrigin}/users/${user.login}/repos`,
        site_admin: user.isSiteAdmin ?? false,
        starred_url: `${github.apiOrigin}/users/${user.login}/starred{/owner}{/repo}`,
        subscriptions_url: `${github.apiOrigin}/users/${user.login}/subscriptions`,
        type: ref.$ref.typeName,
        url: `${github.apiOrigin}/users/${user.login}`,
        email: user.email ?? null,
        name: user.name ?? null,
        user_view_type: 'public',

        // additional fields
        bio: user.bio ?? null,
        blog: user.websiteUrl,
        company: user.company ?? null,
        created_at: user.createdAt,
        followers: 1,
        following: 2,
        hireable: user.isHireable ?? null,
        location: user.location ?? null,
        public_gists: 3,
        public_repos: 4,
        updated_at: user.updatedAt,
        collaborators: 5,
    }),
)
