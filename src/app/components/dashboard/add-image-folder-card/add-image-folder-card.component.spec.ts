import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageFolderCardComponent } from './add-image-folder-card.component';

describe('AddImageFolderCardComponent', () => {
  let component: AddImageFolderCardComponent;
  let fixture: ComponentFixture<AddImageFolderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddImageFolderCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddImageFolderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
