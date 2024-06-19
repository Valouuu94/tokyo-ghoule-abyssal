import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfilsRpComponent } from './create-profils-rp.component';

describe('CreateProfilsRpComponent', () => {
  let component: CreateProfilsRpComponent;
  let fixture: ComponentFixture<CreateProfilsRpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProfilsRpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProfilsRpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
