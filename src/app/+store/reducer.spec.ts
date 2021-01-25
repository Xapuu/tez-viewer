import * as fromReducer from './reducer';
import { appendOperationTableSuccess, loadOperationTable, loadOperationTableSuccess } from './actions';

const operationTableMockPayload = [
    [1, 'type_1', 26432],
    [2, 'type_2', 23756],
    [3, 'type_3', 53422],
];

describe('Operation Table', () => {
    describe('unknown action', () => {
        it('should return the default state', () => {
            const { initialState } = fromReducer;
            const action = {
                type: 'Not Registered Action',
            };
            const state = fromReducer.listReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('load operation items', () => {
        let initialState: fromReducer.InitialOperationTableState;
        let currentState: fromReducer.InitialOperationTableState | null;
        beforeEach(() => {
            initialState = fromReducer.initialState;
            currentState = null;
        });

        it('initially there should be no list items', () => {
            expect(initialState.listItems).toHaveSize(0);
        });


        it('should load operation list items', () => {
            const action = loadOperationTableSuccess({ listResults: operationTableMockPayload });
            currentState = fromReducer.listReducer(initialState, action);

            expect(currentState.listItems).toEqual(operationTableMockPayload);
            expect(currentState.listItems).not.toBe(operationTableMockPayload);
        });


        it('should re-load operation list items', () => {
            const action = loadOperationTableSuccess({ listResults: operationTableMockPayload });

            currentState = fromReducer.listReducer(initialState, action);
            currentState = fromReducer.listReducer(currentState, action);

            expect(currentState.listItems).toEqual(operationTableMockPayload);
            expect(currentState.listItems).not.toBe(operationTableMockPayload);
        });
    });

    describe('append operation items', () => {
        let initialState: fromReducer.InitialOperationTableState;
        let currentState: fromReducer.InitialOperationTableState | null;
        beforeEach(() => {
            initialState = fromReducer.initialState;
            currentState = null;
        });

        it('should append items (after successful loadOperationTableAction)', () => {
            const action = loadOperationTableSuccess({ listResults: operationTableMockPayload });
            currentState = fromReducer.listReducer(initialState, action);

            const appendAction = appendOperationTableSuccess({ listResults: operationTableMockPayload });
            currentState = fromReducer.listReducer(currentState, appendAction);

            expect(currentState.listItems).toEqual([...operationTableMockPayload, ...operationTableMockPayload]);
        });

        it('should append items (after successful loadOperationTableAction and multiple appendOperationTableSuccess actions)', () => {
            const action = loadOperationTableSuccess({ listResults: operationTableMockPayload });
            currentState = fromReducer.listReducer(initialState, action);

            const appendAction = appendOperationTableSuccess({ listResults: operationTableMockPayload });
            currentState = fromReducer.listReducer(currentState, appendAction);
            currentState = fromReducer.listReducer(currentState, appendAction);
            currentState = fromReducer.listReducer(currentState, appendAction);

            expect(currentState.listItems)
            .toEqual([
                ...operationTableMockPayload, ...operationTableMockPayload, ...operationTableMockPayload, ...operationTableMockPayload
            ]);
        });

        it('should reload items (after successful loadOperationTableAction and appendOperationTableSuccess)', () => {
            const action = loadOperationTableSuccess({ listResults: operationTableMockPayload });
            currentState = fromReducer.listReducer(initialState, action);

            const appendAction = appendOperationTableSuccess({ listResults: operationTableMockPayload });
            currentState = fromReducer.listReducer(currentState, appendAction);
            currentState = fromReducer.listReducer(currentState, action);

            expect(currentState.listItems).toEqual(operationTableMockPayload);
            expect(currentState.listItems).not.toBe(operationTableMockPayload);

        });
    });
});
