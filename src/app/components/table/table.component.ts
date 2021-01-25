import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { TableConfig } from 'src/app/interfaces/table-config';
@Component({
  selector: 'tez-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewInit, OnDestroy {

  @ViewChild(CdkVirtualScrollViewport, { static: true }) virtualScroll: CdkVirtualScrollViewport | undefined;
  @Input() item$?: Observable<any[][]>;
  @Input() itemsToLoad = true;

  @Input() tableConfig: TableConfig = [];

  @Output() loadMore: EventEmitter<null> = new EventEmitter();
  @Output() reload: EventEmitter<null> = new EventEmitter();

  isAlive$ = new Subject();
  skip = new BehaviorSubject(false);

  ngAfterViewInit(): void {
    // Trigger `load more` action and skip any following `load more` attempts until new data has been loaded
    combineLatest([
      (this.virtualScroll as CdkVirtualScrollViewport).elementScrolled(),
      this.skip.pipe(distinctUntilChanged())
    ])
      .pipe(
        takeUntil(this.isAlive$),
        filter(([_, skip]) => {
          const botOffset = this.virtualScroll?.measureScrollOffset('bottom');
          return !skip && !!(botOffset && botOffset < 100);
        }),
        debounceTime(100)
      )
      .subscribe(() => {
        this.skip.next(true);
        this.loadMore.emit();
      });


    // Enable new request only when the total items count has been changed
    this.item$?.pipe(
      takeUntil(this.isAlive$),
      map(x => x.length),
      distinctUntilChanged()
    ).subscribe(() => this.skip.next(false));
  }

  ngOnDestroy(): void {
    this.isAlive$.next();
  }

  refresh(): void {
    this.reload.emit();
    this.virtualScroll?.scrollTo({ top: 0 });
  }
}
