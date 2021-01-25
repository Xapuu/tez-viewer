import { AppState, getLastOperationId, getOperationTableList, operationTableFeature } from './selectors';

describe('Selectors', () => {
    const initialState: AppState = {
        operationTable: {
            listItems: [
                [
                    1,
                    'type_1',
                    121321,
                    'prop_1'
                ],
                [
                    2,
                    'type_1',
                    121321,
                    'prop_1'
                ],
                [
                    2,
                    'type_1',
                    121321,
                    'prop_1'
                ],
            ]
        }
    };

    it('should select operation table feature store', () => {
        const result = operationTableFeature.projector(initialState.operationTable);
        expect(result).toEqual(initialState.operationTable);
    });

    it('should select operation table list', () => {
        const result = getOperationTableList.projector(initialState.operationTable);
        expect(result).toEqual(initialState.operationTable.listItems);
    });


    it('should select the first property of the last element inside the operation table result', () => {
        const result = getLastOperationId.projector(initialState.operationTable.listItems);
        expect(result).toEqual(2);
    });

    it('should return undefined if the operation table is empty', () => {
        const result = getLastOperationId.projector([]);
        expect(result).toEqual(undefined);
    });

    it('should retrieve operation table items, while with filtered out first property', () => {
        const props = { removeAt: [0] };
        const result = getOperationTableList.projector(initialState.operationTable, props);
        const compareWith = initialState.operationTable.listItems.map((xs => xs.filter((_, i) => i !== 0)));

        expect(JSON.stringify(result)).toEqual(JSON.stringify(compareWith));
    });

    it('should retrieve operation table items, with all properties, when no `removeAt` property is provided', () => {
        const result = getOperationTableList.projector(initialState.operationTable, {});
        expect(result).toEqual(initialState.operationTable.listItems);
    });
});
