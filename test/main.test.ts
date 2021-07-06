import {
  createScratchNote,
  newScratchNote,
  compose,
  ScratchBook,
  mergeScratchBooks,
  filterScratchBook,
  withPrefix,
  withSuffix,
  withText,
  withExactly,
  withAnyPrefix,
  withAnySuffix,
  withAnyText,
  withAnyExactly,
} from '../src';

const slash = compose('/');

const emptyScratchBook: ScratchBook = {
  notes: [],
};

const getTexts = (scratchBook: ScratchBook): string[] =>
  scratchBook.notes.map(s => s.text);

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
  ])('create a scratch note with %j', ({ parts, text, url, id }) => {
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
  const sc2021 = createScratchNote('year', '2021');
  const sc2021_07 = createScratchNote('year/month', '2021/07');
  const sc2021_08 = createScratchNote('year/month', '2021/08');
  const sc2021_07_01 = createScratchNote('year/month/day', '2021/07/01');
  const sc2021_07_03 = createScratchNote('year/month/day', '2021/07/03');
  const sc12_2021 = createScratchNote('week/year', '12/2021');
  const sb: ScratchBook = {
    notes: [
      sc2021,
      sc2021_08,
      sc2021_07,
      sc2021_07_01,
      sc2021_07_03,
      sc12_2021,
    ],
  };

  it.each([
    {
      f: withPrefix,
      param: 'year/month/day',
      texts: ['2021/07/01', '2021/07/03'],
    },
    {
      f: withSuffix,
      param: 'year/month/day',
      texts: ['2021/07/01', '2021/07/03'],
    },
    {
      f: withText,
      param: 'year/month/day',
      texts: ['2021/07/01', '2021/07/03'],
    },
    {
      f: withExactly,
      param: 'year/month/day',
      texts: ['2021/07/01', '2021/07/03'],
    },
    {
      f: withExactly,
      param: 'year/month/',
      texts: [],
    },
    {
      f: withPrefix,
      param: 'year/month',
      texts: ['2021/08', '2021/07', '2021/07/01', '2021/07/03'],
    },
    {
      f: withSuffix,
      param: '/day',
      texts: ['2021/07/01', '2021/07/03'],
    },
    {
      f: withText,
      param: '/day',
      texts: ['2021/07/01', '2021/07/03'],
    },
    {
      f: withPrefix,
      param: 'does-not-exist',
      texts: [],
    },
    {
      f: withSuffix,
      param: 'does-not-exist',
      texts: [],
    },
    {
      f: withText,
      param: 'does-not-exist',
      texts: [],
    },
    {
      f: withExactly,
      param: 'does-not-exist',
      texts: [],
    },
  ])('filter with %j', ({ f, param, texts }) => {
    const actual = filterScratchBook(f(param))(sb);
    expect(actual.notes).toHaveLength(texts.length);
    expect(getTexts(actual)).toEqual(texts);
  });

  it.each([
    {
      f: withAnyPrefix,
      params: ['year/month/day'],
      texts: ['2021/07/01', '2021/07/03'],
    },
    {
      f: withAnySuffix,
      params: ['year/month/day'],
      texts: ['2021/07/01', '2021/07/03'],
    },
    {
      f: withAnyText,
      params: ['year/month/day'],
      texts: ['2021/07/01', '2021/07/03'],
    },
    {
      f: withAnyExactly,
      params: ['year/month/day'],
      texts: ['2021/07/01', '2021/07/03'],
    },
    {
      f: withAnyPrefix,
      params: ['does not exists'],
      texts: [],
    },
    {
      f: withAnySuffix,
      params: ['does not exists'],
      texts: [],
    },
    {
      f: withAnyText,
      params: ['does not exists'],
      texts: [],
    },
    {
      f: withAnyExactly,
      params: ['does not exists'],
      texts: [],
    },
    {
      f: withAnyPrefix,
      params: ['year/month/day', 'week/year'],
      texts: ['2021/07/01', '2021/07/03', '12/2021'],
    },
    {
      f: withAnySuffix,
      params: ['year/month/day', 'week/year'],
      texts: ['2021/07/01', '2021/07/03', '12/2021'],
    },
    {
      f: withAnyText,
      params: ['year/month/day', 'week/year'],
      texts: ['2021/07/01', '2021/07/03', '12/2021'],
    },
    {
      f: withAnyExactly,
      params: ['year/month/day', 'week/year'],
      texts: ['2021/07/01', '2021/07/03', '12/2021'],
    },
  ])('filter with %j', ({ f, params, texts }) => {
    const actual = filterScratchBook(f(params))(sb);
    expect(actual.notes).toHaveLength(texts.length);
    expect(getTexts(actual)).toEqual(texts);
  });
});
