import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipsPageComponent } from './clips-page.component';

describe('ClipsPageComponent', () => {
  let component: ClipsPageComponent;
  let fixture: ComponentFixture<ClipsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClipsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
