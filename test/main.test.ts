import { createScratchNote } from '../src';

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
