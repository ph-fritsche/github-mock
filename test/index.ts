import {Octokit} from '@octokit/core'
import {createAppWithGithubMock} from '../src/index.ts'

const setup = createAppWithGithubMock(
    fetch => new Octokit({request: {fetch}}),
)

test('get file content from branch', async () => {
    const [octokit] = setup(store => {
        const repository = store.addRepository({
            name: 'example-repo',
            owner: store.addOrganization({
                login: 'example-org',
            }),
        })
        store.addBranch({
            repository,
            target: store.addCommit({
                repository,
                authors: [{name: 'Contributor', email: 'contributor@example.com'}],
                tree: store.addTree({
                    repository,
                    files: {
                        'some/file': 'Example Content',
                    },
                }),
            }),
            name: 'example-branch',
            isDefault: true,
        })
    })

    const graphqlData = await octokit.graphql({
        query: `query {
            repository(owner: "example-org", name: "example-repo") {
                defaultBranchRef {
                    name
                    prefix
                }
                object(expression: "refs/heads/example-branch:some/file") {
                    ... on Blob {
                        text
                    }
                }
            }
        }`,
    })

    expect(graphqlData).toEqual({
        repository: {
            defaultBranchRef: {
                name: 'example-branch',
                prefix: 'refs/heads/',
            },
            object: {
                text: 'Example Content',
            },
        },
    })

    const {data: restData} = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'example-org',
        repo: 'example-repo',
        path: 'some/file',
    })

    expect(restData).toEqual({
        '_links': {
            'git': 'https://api.github.com/repos/example-org/example-repo/git/blobs/e7172d0355acba132ad0a9f1226ea56ad993501c',
            'html': 'https://github.com/repos/example-org/example-repo/blob/example-branch/some/file',
            'self': 'https://api.github.com/repos/example-org/example-repo/contents/some/file?ref=example-branch',
        },
        'content': 'RXhhbXBsZSBDb250ZW50',
        'download_url': 'https://raw.githubusercontent.com/example-org/example-repo/example-branch/some/file',
        'encoding': 'base64',
        'git_url': 'https://api.github.com/repos/example-org/example-repo/git/blobs/e7172d0355acba132ad0a9f1226ea56ad993501c',
        'html_url': 'https://github.com/repos/example-org/example-repo/blob/example-branch/some/file',
        'name': 'file',
        'path': 'some/file',
        'sha': 'e7172d0355acba132ad0a9f1226ea56ad993501c',
        'size': 15,
        'type': 'file',
        'url': 'https://api.github.com/repos/example-org/example-repo/contents/some/file?ref=example-branch',
    })
})

test('get user', async () => {
    const [octokit] = setup(store => {
        store.addUser({
            databaseId: 123456,
            login: 'example-user',
        })
    })

    const {data: restData} = await octokit.request('GET /users/{username}', {
        username: 'example-user',
    })

    expect(restData).toEqual(expect.objectContaining({
        login: 'example-user',
        id: 123456,
    }))
})

test('fail for unmatched routes', async () => {
    const [octokit] = setup()

    await expect(octokit.request('GET /foo/bar')).rejects.toThrowError('No response or fallback rule')
})
