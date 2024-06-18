import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilsRpComponent } from './profils-rp.component';

describe('ProfilsRpComponent', () => {
  let component: ProfilsRpComponent;
  let fixture: ComponentFixture<ProfilsRpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilsRpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilsRpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
