import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { OperationTableModel } from './+store/operation-table-model.service';
import { TableConfig } from './interfaces/table-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tableConfig: TableConfig = [
    {
      alias: 'Type',
      key: 'type'
    },
    {
      alias: 'Amount XTZ ( USD )',
      key: 'volume'
    },
    {
      alias: 'Date',
      key: 'time'
    },
    {
      alias: 'Address',
      key: 'sender'
    }
  ];

  defaultFilters: [string, any][] = [['limit', 10]];


  seed$ = this.operationTableModel.getOperationTableFilteredSource([0]).pipe(filter(x => !!x));
  lastId$ = this.operationTableModel.getLastOperationId$;


  loadMore(): void {
    this.operationTableModel.loadNextOperationTableItems(this.tableConfig, this.defaultFilters);
  }

  reload(): void {
    this.operationTableModel.loadOperationTableItems(this.tableConfig, this.defaultFilters);
  }

  constructor(private operationTableModel: OperationTableModel) {
    this.operationTableModel.loadOperationTableItems(this.tableConfig, this.defaultFilters);
  }
}
