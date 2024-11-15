import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountContentFilterComponent } from './account-content-filter.component';

describe('AccountContentFilterComponent', () => {
  let component: AccountContentFilterComponent;
  let fixture: ComponentFixture<AccountContentFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountContentFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountContentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
