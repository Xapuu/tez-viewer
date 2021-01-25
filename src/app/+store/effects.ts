import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { OperationTableService } from '../services/operation-table.service';
import {
  appendOperationTable,
  appendOperationTableFailed,
  appendOperationTableSuccess, loadOperationTable, loadOperationTableFailed, loadOperationTableSuccess
} from './actions';
import { OperationTableModel } from './operation-table-model.service';

@Injectable()
export class OperationTableEffects {

  loadOperationTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOperationTable),
      switchMap(({ columns, filters }) => this.operationTableService.loadOperationTable(columns, filters).pipe(
        map(response => loadOperationTableSuccess({ listResults: response })),
        catchError(error => [loadOperationTableFailed({ error })])
      ))
    )
  );

  loadNextOperationTable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appendOperationTable),
      withLatestFrom(this.operationModel.getLastOperationId$.pipe(filter(x => !!x))),
      switchMap(([{ columns, filters }, id]) =>
        this.operationTableService.loadOperationTable(columns, [...filters, ['row_id.gte', id + 1]]).pipe(
          takeUntil(this.actions$.pipe(ofType(loadOperationTable))),
          map(response => appendOperationTableSuccess({ listResults: response })),
          catchError(error => [appendOperationTableFailed({ error })])
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private operationTableService: OperationTableService,
    private operationModel: OperationTableModel
  ) { }
}
