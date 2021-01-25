import { createSelector, createFeatureSelector } from '@ngrx/store';
import { InitialOperationTableState } from './reducer';

export interface AppState {
    operationTable: InitialOperationTableState;
}

export const operationTableFeature = createFeatureSelector<AppState, InitialOperationTableState>('operationTable');


export const getList = (state: InitialOperationTableState, props: { removeAt: number[] }) => {
    if (!props || !props.removeAt) {
        return state.listItems;
    }

    return state.listItems.map(item =>
        item.filter((_, i) => !props.removeAt.includes(i))
    );
};


export const getOperationTableList = createSelector(operationTableFeature, getList);

export const getLastOperationId = createSelector(getOperationTableList, (x) => {
    if (!x || !x.length) {
        return undefined;
    }
    return x[x.length - 1][0];
});

