# Scratch Book

![Build status](https://github.com/flarebyte/scratchbook/actions/workflows/main.yml/badge.svg)
![Dependencies](https://status.david-dm.org/gh/flarebyte/scratchbook.svg)

> Scratch Book is an annotation library written in Typescript that makes it easy to write documentation in a decentralized fashion.

- **Typescript** can be used to write the documentation. Integrates perfectly with [ts-node](https://typestrong.org/ts-node/).
- **No dependency** and lightweight (less than 1KB).
- **Advanced matchers** to query the notes.
- **Simple model** for the notes that requires very little learning curve while still offering a lot of flexibility.
- **extensive tests coverage**.

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

### Documentation

A detailed documentation for each functions is [available](https://flarebyte.github.io/scratchbook/)

### Installation

```
yarn add scratchbook
```

## License

MIT © [2021 Flarebyte - Olivier Huin]()
