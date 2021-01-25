import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { uniqueType } from '../utils/unique-action';

const nameSpace = '[Operation Table List]';

export const loadOperationTable = createAction(
    uniqueType(`${nameSpace} Load Initial Operation Table Items`), props<{ columns: string[]; filters: [string, any][] }>());
export const loadOperationTableSuccess = createAction(
    uniqueType(`${nameSpace} Load Initial Operation Table Items Success`), props<{ listResults: Array<Array<any>> }>());
export const loadOperationTableFailed = createAction(
    uniqueType(`${nameSpace} Load Initial Operation Table Items Failed`), props<{ error: HttpErrorResponse }>());

export const appendOperationTable = createAction(
    uniqueType(`${nameSpace} Load Additional Operation Table Items`), props<{ columns: string[]; filters: [string, any][] }>());
export const appendOperationTableSuccess = createAction(
    uniqueType(`${nameSpace} Load Additional Operation Table Items Success`), props<{ listResults: any[] }>());
export const appendOperationTableFailed = createAction(
    uniqueType(`${nameSpace} Load Additional Operation Table Items failed`), props<{ error: HttpErrorResponse }>());
