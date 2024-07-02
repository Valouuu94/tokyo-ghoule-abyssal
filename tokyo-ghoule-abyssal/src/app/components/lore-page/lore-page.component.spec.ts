import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorePageComponent } from './lore-page.component';

describe('LorePageComponent', () => {
  let component: LorePageComponent;
  let fixture: ComponentFixture<LorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LorePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
