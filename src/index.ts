/**
 * Scratch Book is an annotation library written in Typescript that makes it easy to write documentation in a decentralized fashion
 *
 * @module
 */

/**
 * Content for a scratch book note
 */
interface ScratchNote {
  /**
   * An unique identifier for the note (ex: japan/tokyo)
   */
  id: string;
  /**
   * A text summary for the note
   */
  text: string;
  /**
   * An optional link
   */
  url?: string;
}

/**
 * A collection of notes
 */
interface ScratchBook {
  /**
   * A list of notes
   */
  notes: ScratchNote[];
}

/**
 * Create a scratch note
 * Example:
 * ```typescript
 *  createScratchNote('year/month', '2021/07')
 * ```
 *
 * Or with a link:
 * ```typescript
 *  createScratchNote('prog/language', 'TypeScript', 'https://en.wikipedia.org/wiki/TypeScript')
 * ```
 * @category factory
 */
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

/**
 * Compose a key by joining string parts together using a separator.
 * Example:
 * ```typescript
 *  compose('/')(['year', 'month'])
 * ```
 * @category factory
 */
const compose = (separator: string) => (parts: string[]) =>
  parts.join(separator);

/**
 * Create a scratch note using a composer
 * Example:
 * ```typescript
 *  const slash = compose('/');
 *  newScratchNote(slash)(['year', 'month'], '2021/07');
 * ```
 *
 * Or with a link:
 * ```typescript
 *  newScratchNote(slash)(['prog', 'language'], 'TypeScript', 'https://en.wikipedia.org/wiki/TypeScript')
 * ```
 * @category factory
 */
const newScratchNote = (composer: IdComposer) => (
  idParts: string[],
  text: string,
  url?: string
) => createScratchNote(composer(idParts), text, url);

const sortedById = (a: ScratchNote, b: ScratchNote): number => {
  if (a.id === b.id) {
    return 0;
  }
  if (a.id > b.id) {
    return 1;
  }
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

/**
 * Search the notes of by their id and remove duplicate notes.
 * Two notes are a duplicate if all their fields (id, text, url) are the same.
 * Example:
 * ```typescript
 *  const orderedScratchBook = sortScratchBook(messyScratchBook)
 * ```
 * @category transform
 */
const sortScratchBook = (scratchBook: ScratchBook) => ({
  notes: scratchBook.notes.sort(sortedById).filter(keepUniqueNote),
});

const mergeTwoScratchBook = (a: ScratchBook, b: ScratchBook): ScratchBook => ({
  notes: [...a.notes, ...b.notes].sort(sortedById),
});

/**
 * Merge several scratch books into one. The notes will be sorted by id and unique.
 * Example:
 * ```typescript
 *  const globalScratchBook = mergeScratchBooks([fishScratchBook, birdScratchBook])
 * ```
 * @category transform
 */
const mergeScratchBooks = (scratchBooks: ScratchBook[]): ScratchBook =>
  sortScratchBook(scratchBooks.reduce(mergeTwoScratchBook));

type IdMatcher = (id: string) => boolean;

/**
 * Filter a scratch book based on a composable matcher
 * Example:
 * ```typescript
 *  const query = and([withPrefix('year'), withSuffix('day')]);
 *  const specificScratchBook = filterScratchBook(query)(mainScratchBook)
 * ```
 * @category transform
 */
const filterScratchBook = (matcher: IdMatcher) => (
  scratchBook: ScratchBook
): ScratchBook => ({
  notes: scratchBook.notes.filter(n => matcher(n.id)),
});

/**
 * Logical AND on two or more matchers
 * Example:
 * ```typescript
 *  const query = and([withPrefix('year'), withSuffix('day')]);
 * ```
 * @category matcher
 */
const and = (matchers: IdMatcher[]) => (id: string): boolean =>
  matchers.every(m => m(id));

/**
 * Logical OR on two or more matchers
 * Example:
 * ```typescript
 *  const query = or([withPrefix('fish'), withPrefix('bird')]);
 * ```
 * @category matcher
 */
const or = (matchers: IdMatcher[]) => (id: string): boolean =>
  matchers.some(m => m(id));

/**
 * Logical NOT on a matcher
 * Example:
 * ```typescript
 *  const query = not(withPrefix('fish'));
 * ```
 * @category matcher
 */

const not = (matcher: IdMatcher) => (id: string): boolean => !matcher(id);

/**
 * Matcher for an id that starts with a prefix
 * Example:
 * ```typescript
 *  const query = withPrefix('year/month');
 * ```
 * @category matcher
 */
const withPrefix = (prefix: string) => (id: string) => id.startsWith(prefix);

/**
 * Matcher for an id that ends with a suffix
 * Example:
 * ```typescript
 *  const query = withSuffix('/day');
 * ```
 * @category matcher
 */
const withSuffix = (suffix: string) => (id: string) => id.endsWith(suffix);

/**
 * Matcher for an id that includes a given text
 * Example:
 * ```typescript
 *  const query = withText('_name');
 * ```
 * @category matcher
 */
const withText = (text: string) => (id: string) => id.includes(text);
/**
 * Matcher for an id that matches exactly a given text
 * Example:
 * ```typescript
 *  const query = withExactly('year/month/day');
 * ```
 * @category matcher
 */
const withExactly = (text: string) => (id: string) => id === text;
/**
 * Matcher for an id that starts with at least one of several prefixes
 * Example:
 * ```typescript
 *  const query = withAnyPrefix(['year/month', 'year/week']);
 * ```
 * @category matcher
 */
const withAnyPrefix = (prefixList: string[]) => (id: string) =>
  prefixList.map(prefix => id.startsWith(prefix)).some(b => b);
/**
 * Matcher for an id that ends with at least one of several suffixes
 * Example:
 * ```typescript
 *  const query = withAnySuffix(['/available', '/cheap']);
 * ```
 * @category matcher
 */
const withAnySuffix = (suffixList: string[]) => (id: string) =>
  suffixList.map(suffix => id.endsWith(suffix)).some(b => b);

/**
 * Matcher for an id that includes at least one of several text fragments
 * Example:
 * ```typescript
 *  const query = withAnyText(['_blue', '_red']);
 * ```
 * @category matcher
 */
const withAnyText = (textList: string[]) => (id: string) =>
  textList.map(text => id.includes(text)).some(b => b);

/**
 * Matcher for an id that matches exactly at least one of several text fragments
 * Example:
 * ```typescript
 *  const query = withAnyExactly(['year/month', 'year/week']);
 * ```
 * @category matcher
 */

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
