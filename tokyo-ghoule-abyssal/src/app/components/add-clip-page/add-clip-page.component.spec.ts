import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClipPageComponent } from './add-clip-page.component';

describe('AddClipPageComponent', () => {
  let component: AddClipPageComponent;
  let fixture: ComponentFixture<AddClipPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClipPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClipPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
