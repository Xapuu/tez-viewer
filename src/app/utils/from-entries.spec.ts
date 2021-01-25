import { fromEntries } from './from-entries';

describe('From Entries utility' , () => {

    it('should return empty array if no values are passed', () => {
        expect(fromEntries([])).toHaveSize(0);
    });

    it('should return object representing kvp from the input argument', () => {
        const expectedResult = {
            a: 1,
            b: null
        };
        expect(fromEntries([['a', 1], ['b', null]])).toEqual(expectedResult);
    });
});
