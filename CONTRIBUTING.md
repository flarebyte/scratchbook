# Contributing

Welcome ! and many thanks for taking the time to contribute !

First, you should have a look at the [Technical design documentation](TECHNICAL_DESIGN.md) to get an understanding of the design behind this project.

From there, there are a few options dependending of which kind of contributions you have in mind: bug fix, documentation improvement, translation, testing, ...

Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Build the project locally

The project mostly relies on the approach suggested by [ts-dx](TSDX.md).

The following commands should get you started

```
yarn install
yarn test

```

Please keep an eye on test coverage, bundle size and documentation.

```
yarn ready
```

You can also simulate [Github actions](https://docs.github.com/en/actions) locally with [act](https://github.com/nektos/act). You will need to setup `.actrc` with the node.js docker image `-P ubuntu-latest=node:12-buster`

To run the pipeline:

```
act
```

## Pull Request Process

1. Make sure that an issue describing the intended code change exists and that this issue has been accepted.


## Publishing the library

This would be done by the main maintainers of the project. Locally for now as updates are pretty infrequent.

```
yarn version
```