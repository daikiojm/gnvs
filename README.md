# gnvs (GitHub Naming Versus Search)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn start
```

## GitHub OAuth and Vercel setup (local development)

1. Create OAuth App
  - https://github.com/settings/applications/new

2. Register Development Environment Variables on Vercel Settings
  - use Development environment
  - https://vercel.com/docs/environment-variables#environments

3. Downloaded Vercel Environment Variables into a local development
  - run `npx vercel env pull`
  - https://vercel.com/docs/environment-variables#development-environment-variables

4. Start App
 - run `yarn start`

## Directory Description

Directory structure is as follows.

- api
  - place the api handler for vercel serverless functions.
- lib
  - place the shared(api/app) core logic and types.
- src/composables
  - place the use case layer.
