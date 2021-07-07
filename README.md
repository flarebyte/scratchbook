# Scratch Book

> Scratch Book is an annotation library written in Typescript that makes it easy to write documentation in a decentralized fashion.

* __Typescript__ can be used to write the documentation. Integrates perfectly with [ts-node](https://typestrong.org/ts-node/).
* __No dependency__ and lightweight.
* __Advanced matchers__ to query the notes.
* __Simple model__ for the notes that requires very little learning curve while still offering a lot of flexibility.
* __extensive tests coverage__.

## Usage

```
const myScratchBook: ScratchBook = {
    notes: [
        createScratchNote('about/scratchbook/description', 'Annotation library'),
        createScratchNote('about/scratchbook/github', 'scratchbook on github', 'https://github.com/flarebyte/scratchbook'),
        createScratchNote('about/other/...', 'Some other projects')
    ]
}
filterScratchBook(withPrefix('about/scratchbook/'))(myScratchBook)
// will return the description and the github link

```

[API documentation](/docs)


### Installation

```
yarn add scratchbook
```

## License

MIT © [2021 Flarebyte - Olivier Huin]()