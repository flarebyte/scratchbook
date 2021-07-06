interface ScratchNote {
  id: string;
  text: string;
  url?: string;
}

interface ScratchBook {
  notes: ScratchNote[];
}

const createScratchNote = (
  id: string,
  text: string,
  url?: string
): ScratchNote => ({
  id,
  text,
  url,
});

type IdComposer = (parts: string[]) => string;

const compose = (separator: string) => (parts: string[]) =>
  parts.join(separator);

const newScratchNote = (composer: IdComposer) => (
  idParts: string[],
  text: string,
  url?: string
) => createScratchNote(composer(idParts), text, url);

const sortedById = (a: ScratchNote, b: ScratchNote): number => {
  if (a.id === b.id) return 0;
  if (a.id > b.id) return 1;
  return -1;
};

const keepUniqueNote = (
  value: ScratchNote,
  index: number,
  self: ScratchNote[]
) =>
  self.findIndex(
    v => v.id === value.id && v.text === value.text && v.url === value.url
  ) === index;

const sortScratchBook = (scratchBook: ScratchBook) => ({
  notes: scratchBook.notes.sort(sortedById).filter(keepUniqueNote),
});

const mergeTwoScratchBook = (a: ScratchBook, b: ScratchBook): ScratchBook => ({
  notes: [...a.notes, ...b.notes].sort(sortedById),
});

const mergeScratchBooks = (scratchBooks: ScratchBook[]): ScratchBook =>
  sortScratchBook(scratchBooks.reduce(mergeTwoScratchBook));

type IdMatcher = (id: string) => boolean;

const filterScratchBook = (matcher: IdMatcher) => (
  scratchBook: ScratchBook
): ScratchBook => ({
  notes: scratchBook.notes.filter(n => matcher(n.id)),
});

const and = (matchers: IdMatcher[]) => (id: string): boolean =>
  matchers.every(m => m(id));
const or = (matchers: IdMatcher[]) => (id: string): boolean =>
  matchers.some(m => m(id));

const not = (matcher: IdMatcher) => (id: string): boolean => !matcher(id);

const withPrefix = (prefix: string) => (id: string) => id.startsWith(prefix);

const withSuffix = (suffix: string) => (id: string) => id.endsWith(suffix);

const withText = (text: string) => (id: string) => id.includes(text);

const withExactly = (text: string) => (id: string) => id === text;

const withAnyPrefix = (prefixList: string[]) => (id: string) =>
  prefixList.map(prefix => id.startsWith(prefix)).some(b => b);

const withAnySuffix = (suffixList: string[]) => (id: string) =>
  suffixList.map(suffix => id.endsWith(suffix)).some(b => b);

const withAnyText = (textList: string[]) => (id: string) =>
  textList.map(text => id.includes(text)).some(b => b);

const withAnyExactly = (textList: string[]) => (id: string) =>
  textList.map(text => id === text).some(b => b);

export {
  ScratchNote,
  ScratchBook,
  createScratchNote,
  newScratchNote,
  mergeScratchBooks,
  filterScratchBook,
  sortScratchBook,
  and,
  or,
  not,
  withPrefix,
  withSuffix,
  withText,
  withExactly,
  withAnyPrefix,
  withAnySuffix,
  withAnyText,
  withAnyExactly,
  compose,
};
