import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[tezAlignToColumn]'
})
export class AlignToColumnDirective implements OnInit, OnDestroy {
  constructor(private el: ElementRef, private render: Renderer2) { }

  @Input() alginToRow?: HTMLTableRowElement;
  @Input() reCalculate$?: Observable<any>;
  @Input() idx?: number;

  resize = new BehaviorSubject(null);

  isAlive$ = new Subject();
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.resize.next(null);
  }

  ngOnInit(): void {
    combineLatest([
      (this.reCalculate$ as Observable<any>),
      this.resize
    ])
      .pipe(
        takeUntil(this.isAlive$),
        filter(() => !!this.alginToRow),
        delay(100),
      )
      .subscribe(() => {
        if (this.idx === undefined || this.alginToRow === undefined) {
          return;
        }
        const refTd = this.alginToRow?.children[this.idx];
        const columnWidth = refTd.getBoundingClientRect().width;
        this.render.setStyle(this.el.nativeElement, 'width', columnWidth < 100 ? 100 : columnWidth + 'px');
      });
  }

  ngOnDestroy(): void {
    this.isAlive$.next();
  }
}
