import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditCardComponent } from './image-edit-card.component';

describe('ImageEditCardComponent', () => {
  let component: ImageEditCardComponent;
  let fixture: ComponentFixture<ImageEditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageEditCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageEditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
