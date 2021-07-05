import { createScratchNote, newScratchNote, compose } from '../src';

const slash = compose('/');

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
