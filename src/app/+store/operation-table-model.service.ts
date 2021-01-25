import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TableConfig } from '../interfaces/table-config';
import { appendOperationTable, loadOperationTable } from './actions';
import { AppState, getLastOperationId, getOperationTableList } from './selectors';

@Injectable({ providedIn: 'root' })
export class OperationTableModel {

    getLastOperationId$ = this.store.pipe(select(getLastOperationId));

    constructor(private store: Store<AppState>) { }

    loadOperationTableItems = (tableConfig: TableConfig, filters: [string, any][]) => {
        this.store.dispatch(
            loadOperationTable({
                columns: ['row_id', ...tableConfig.map(x => x.key)],
                filters
            }));
    }

    loadNextOperationTableItems = (tableConfig: TableConfig, filters: [string, any][]) => {
        this.store.dispatch(
            appendOperationTable({
                columns: ['row_id', ...tableConfig.map(x => x.key)],
                filters
            }));
    }

    getOperationTableFilteredSource = (removeAt: number[] = []) => {
        return this.store.pipe(select(getOperationTableList, {removeAt}));
    }
}
