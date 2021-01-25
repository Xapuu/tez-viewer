import { createReducer, on } from '@ngrx/store';
import { appendOperationTableSuccess, loadOperationTableSuccess } from './actions';

export interface InitialOperationTableState {
    listItems: Array<Array<any>>;
}

export const initialState: InitialOperationTableState = {
    listItems: []
};

export const listReducer = createReducer(
    initialState,
    on(loadOperationTableSuccess, (state, {listResults}) => {
        return {
            ...state,
            listItems: [...listResults]
        };
    }),
    on(appendOperationTableSuccess, (state, {listResults}) => {
        return {
            ...state,
            listItems: [...state.listItems, ...listResults]
        };
    }),
);

