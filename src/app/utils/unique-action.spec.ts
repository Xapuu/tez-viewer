import { checkUniqueType } from './unique-action';

describe('Unique Type utility', () => {

    let uniqueType: (x: string) => string;
    beforeEach(() => {
        uniqueType = checkUniqueType();
    });

    it('should return the values passed as argument', () => {
        expect(uniqueType('a')).toEqual('a');
    });
    it('should not throw error if called with different strings', () => {
        expect(uniqueType('a')).toEqual('a');
        expect(uniqueType('b')).toEqual('b');
        expect(uniqueType('c')).toEqual('c');
    });
    it('should throw error if called with already registered value', () => {
        uniqueType('a');
        expect(() => uniqueType('a')).toThrow();
    });
});
