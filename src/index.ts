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

const mergeTwoScratchBook = (a: ScratchBook, b: ScratchBook): ScratchBook => ({
  notes: [...a.notes, ...b.notes],
});

const mergeScratchBooks = (scratchBooks: ScratchBook[]): ScratchBook =>
  scratchBooks.reduce(mergeTwoScratchBook);

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

const withAnyPrefix = (prefixList: string[]) => (id: string) =>
  prefixList.map(prefix => id.startsWith(prefix)).some(b => b);

const withAnySuffix = (suffixList: string[]) => (id: string) =>
  suffixList.map(suffix => id.endsWith(suffix)).some(b => b);

const withAnyText = (textList: string[]) => (id: string) =>
  textList.map(text => id.includes(text)).some(b => b);

export {
  ScratchNote,
  ScratchBook,
  createScratchNote,
  mergeScratchBooks,
  filterScratchBook,
  and,
  or,
  not,
  withPrefix,
  withSuffix,
  withText,
  withAnyPrefix,
  withAnySuffix,
  withAnyText,
};
