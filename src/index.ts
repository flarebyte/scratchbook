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

const mergeScratchBooks = (flatBooks: ScratchBook[]): ScratchBook =>
  flatBooks.reduce(mergeTwoScratchBook);

const byScratchNotePrefix = (prefix: string) => (
  scratchNote: ScratchNote
): boolean => scratchNote.id.startsWith(prefix);

const byScratchNoteSuffix = (suffix: string) => (
  scratchNote: ScratchNote
): boolean => scratchNote.id.endsWith(suffix);

const byScratchNoteSuffixList = (suffixList: string[]) => (
  scratchNote: ScratchNote
): boolean =>
  suffixList.map(suffix => scratchNote.id.endsWith(suffix)).some(b => b);

export {
  ScratchNote,
  ScratchBook,
  createScratchNote,
  mergeScratchBooks,
  byScratchNotePrefix,
  byScratchNoteSuffix,
  byScratchNoteSuffixList,
};
