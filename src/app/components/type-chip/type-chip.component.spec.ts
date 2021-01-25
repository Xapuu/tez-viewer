import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeChipComponent } from './type-chip.component';

describe('TypeChipComponent', () => {
  let component: TypeChipComponent;
  let fixture: ComponentFixture<TypeChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ TypeChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeChipComponent);
    fixture.componentInstance.type = 'activate_account';
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
