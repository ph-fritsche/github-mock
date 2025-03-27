# github-mock

Mocking GitHub APIs made easy.

## Why?

GitHub's REST and GraphQL APIs are powerful and well-documented.
Writing a tool or script that works is usually a quick and enjoyable experience.
Creating meaningful tests – which allow to iterate on it with confidence – is not.

Snapshots require to run the requests against live APIs
and stubbing responses is error-prone and only slightly better than just proofreading the implementation.
While the documentation and types are already there, the code needed to create a beneficial test environment in most cases probably dwarfs the code under test itself.

Hopefully this library can change this.

## How?

```ts
import {Octokit} from '@octokit/core'
import {createAppWithGithubMock} from 'github-mock'
import {createApp} from '../src/my-app-setup.ts'

const setup = createAppWithGithubMock(
    fetch => createApp(new Octokit({request: {fetch}})),
    config => {
        // Add additional mock implementations…
    },
)

test('make REST and GraphQL requests with working API mocks', async () => {
    const [myApp, mock] = setup(store => {
        // Add initial data…
    })

    // Interact with one or more mocked APIs…
    await myApp.doSomething()

    // Assert app output and/or store state…
})
```

If you have written an additional mock implementation,
please consider opening a PR to add it to this library.
