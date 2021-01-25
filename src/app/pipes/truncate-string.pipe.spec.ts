import { TruncateStringPipe } from './truncate-string.pipe';

describe('TruncateStringPipe', () => {
  const stringForTruncation = '123456789';
  let pipe: TruncateStringPipe;

  beforeEach(() => {
    pipe = new TruncateStringPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });


  describe('start range bigger than input string length', () => {
    it('should return the initial value', () => {
      expect(pipe.transform(stringForTruncation, 10)).toEqual(stringForTruncation);
    });
  });
  describe('start range equals zero and end range bigger than input string length', () => {
    it('should return the initial value', () => {
      expect(pipe.transform(stringForTruncation, 0, 10)).toEqual(stringForTruncation);
    });
  });
  describe('start and end range sum bigger than input string length', () => {
    it('should return the initial value', () => {
      expect(pipe.transform(stringForTruncation, 6, 4)).toEqual(stringForTruncation);
    });
  });

  describe('missing start range and end range', () => {
    it('should return the initial value', () => {
      expect(pipe.transform(stringForTruncation)).toEqual(stringForTruncation);
    });
  });

  describe('start range less then input string and no end range', () => {
    const startRange = 2;
    it(`should return the first ${startRange} elements from the start range and append ellipses`, () => {
      expect(pipe.transform(stringForTruncation, 2)).toEqual(stringForTruncation.slice(0, 2) + '...');
    });
  });

  describe('start and end range sum less then input string length ', () => {
    const startRange = 2;
    const endRange = 3;
    it(`should return the first ${startRange} chars, ellipses and the last ${endRange} chars`, () => {
      expect(pipe.transform(stringForTruncation, 2, endRange))
        .toEqual(stringForTruncation.slice(0, 2) + '...' + stringForTruncation.slice(stringForTruncation.length - endRange));
    });
  });

  describe('start range equals zero and end range less then input string length ', () => {
    const endRange = 3;
    it(`should return ellipses followed by the last ${endRange} chars`, () => {
      expect(pipe.transform(stringForTruncation, 0, endRange))
        .toEqual('...' + stringForTruncation.slice(stringForTruncation.length - endRange));
    });
  });

});
