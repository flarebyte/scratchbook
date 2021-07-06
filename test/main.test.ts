import {
  createScratchNote,
  newScratchNote,
  compose,
  ScratchBook,
  mergeScratchBooks,
  filterScratchBook,
  withPrefix
} from '../src';

const slash = compose('/');

const emptyScratchBook: ScratchBook = {
  notes: [],
};

const createDummyScratchNote = (idx: number) =>
  createScratchNote(
    `id/${idx}`,
    `Some text with ${idx}`,
    idx % 2 === 0 ? undefined : `http://site.com/${idx}`
  );

describe('create some scratch note', () => {
  it('create a simple scratch note', () => {
    expect(createScratchNote('some-id', 'some text')).toBeDefined();
  });
  it('create a scratch note with link', () => {
    expect(
      createScratchNote(
        'some-id',
        'some text',
        'https://github.com/flarebyte/scratchbook'
      )
    ).toBeDefined();
  });
});

describe('create some scratch note with composer', () => {
  it.each([
    {
      parts: [],
      text: 'some text',
      url: undefined,
      id: '',
    },
    {
      parts: ['bird'],
      text: 'Eagle',
      url: undefined,
      id: 'bird',
    },
    {
      parts: ['bird', 'predator'],
      text: 'Eagle',
      url: undefined,
      id: 'bird/predator',
    },
    {
      parts: ['bird', 'predator', 'worldwide'],
      text: 'Eagle',
      url: undefined,
      id: 'bird/predator/worldwide',
    },
  ])('create a scratch note with $text, $url', ({ parts, text, url, id }) => {
    const actual = newScratchNote(slash)(parts, text, url);
    expect(actual).toBeDefined();
    expect(actual.id).toBe(id);
  });
});

describe('merge scratch books', () => {
  const sb123: ScratchBook = {
    notes: [1, 2, 3].map(createDummyScratchNote),
  };
  const sb12: ScratchBook = {
    notes: [1, 2].map(createDummyScratchNote),
  };
  const sb34: ScratchBook = {
    notes: [3, 4].map(createDummyScratchNote),
  };
  const sb56: ScratchBook = {
    notes: [5, 6].map(createDummyScratchNote),
  };

  const sb456: ScratchBook = {
    notes: [4, 5, 6].map(createDummyScratchNote),
  };
  const sb123456: ScratchBook = {
    notes: [1, 2, 3, 4, 5, 6].map(createDummyScratchNote),
  };
  it('marge empty', () => {
    const actual = mergeScratchBooks([emptyScratchBook]);
    expect(actual).toEqual(emptyScratchBook);
  });
  it('merge 123', () => {
    const actual = mergeScratchBooks([sb123]);
    expect(actual).toEqual(sb123);
  });
  it('merge 123 and 12', () => {
    const actual = mergeScratchBooks([sb123, sb12]);
    expect(actual).toEqual(sb123);
  });
  it('merge 12 and 123', () => {
    const actual = mergeScratchBooks([sb12, sb123]);
    expect(actual).toEqual(sb123);
  });
  it('merge 123 and 456', () => {
    const actual = mergeScratchBooks([sb123, sb456]);
    expect(actual).toEqual(sb123456);
  });

  it('merge 12 and 34 and 56', () => {
    const actual = mergeScratchBooks([sb12, sb56, sb34]);
    expect(actual).toEqual(sb123456);
  });
});

describe('filter scratch book', () => {
  const scEmpty = createScratchNote('empty', 'empty');
  const sb: ScratchBook = {
    notes: [
      scEmpty
    ],
  };

  it('create a simple scratch note', () => {
    const actual = filterScratchBook(withPrefix("id"))(sb)
    expect(actual.notes).toHaveLength(1);
    expect(actual.notes[0]).toEqual(scEmpty);
  });

});