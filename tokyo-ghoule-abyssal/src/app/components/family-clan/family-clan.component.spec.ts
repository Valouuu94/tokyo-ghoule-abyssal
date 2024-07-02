import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyClanComponent } from './family-clan.component';

describe('FamilyClanComponent', () => {
  let component: FamilyClanComponent;
  let fixture: ComponentFixture<FamilyClanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyClanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyClanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
