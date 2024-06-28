import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationForm } from './organization-form.component';

describe('FirtsformComponent', () => {
  let component: OrganizationForm;
  let fixture: ComponentFixture<OrganizationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationForm]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
