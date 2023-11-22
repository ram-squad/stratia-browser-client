# sveltekit-app-template

This is a template for a SvelteKit TypeScript app.

The following following tools have been configured:

- [npm](https://www.npmjs.com/) for package management and Node.js scripts
- [Sass](https://www.npmjs.com/package/sass) for SASS support
- [TypeScript](https://www.npmjs.com/package/typescript) for TypeScript support
- [ESLint](https://www.npmjs.com/package/eslint) for linting
  - [typescript-eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) for linting TypeScript
  - [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) for linting import/export
  - [eslint-plugin-svelte](https://www.npmjs.com/package/eslint-plugin-svelte) for linting Svelte
- [Prettier](https://www.npmjs.com/package/prettier) for code formatting
  - [prettier-plugin-svelte](https://www.npmjs.com/package/prettier-plugin-svelte) for formatting Svelte
- [Vitest](https://www.npmjs.com/package/vitest) for unit testing
- [Playwright](https://www.npmjs.com/package/playwright) for end-to-end testing
- [GitHub Actions](https://docs.github.com/en/actions) for CI/CD
- [Docker](https://www.docker.com/) for containerization
- [Testcontainers](https://www.npmjs.com/package/testcontainers) for testing with Docker containers
- [Hadolint](https://github.com/hadolint/hadolint) for linting Dockerfiles

## Usage

### Install dependencies

```bash
npm ci
```

### Edit the code

You can edit the code in the `src` directory.

### Run the application in development mode

```bash
npm run dev
```

### Build the application

```bash
npm run build
```

This will create a `build` directory with the built application.

### Run the build application

```bash
node ./build/index.js
```

Note: This will command will fail if the application has not been built (no `build` directory)!

### Test the application

The tests can be found in the `test` directory.
[Vitest](https://www.npmjs.com/package/vitest) is used to run and write the tests.

To run the unit tests:

```bash
npm run vitest:check
```

This will run the tests and also providing a tabular code coverage report.
An HTML code coverage report will be also generated in the `coverage-report` directory.

To run the end-to-end tests:

```bash
npm run playwright:check
```

### Run the linter

```bash
npm run eslint:check
```

Note: The linter will return a non-zero exit code if there are any linting errors or warnings.

You can also try to automatically fix some of the errors and warnings by running:

```bash
npm run eslint:fix
```

### Run the formatter

```bash
npm run prettier:check
```

Formatting errors can be automatically fixed by running:

```bash
npm run prettier:fix
```

## GitHub Actions

### Continuous integration

There are two CI pipelines configured in the `.github/workflows` directory:

- [Continuous integration on push](.github/workflows/continuous_integration_on_push.yml): This pipeline will check the integrity of the code by running formatting, linting, and basic testing.
- [Continuous integration on pull request](.github/workflows/continuous_integration_on_pull_request.yml): This pipeline will check the integrity of the code by running formatting, linting, and testing, including end-to-end testing.

### Continuous delivery

There is one CD pipeline configured in the `.github/workflows` directory:

- [Release](.github/workflows/release.yml): This pipeline will create a GitHub release, build a Docker image, and push it to a Docker registry.
