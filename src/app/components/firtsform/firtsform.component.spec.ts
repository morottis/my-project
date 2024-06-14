import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirtsformComponent } from './firtsform.component';

describe('FirtsformComponent', () => {
  let component: FirtsformComponent;
  let fixture: ComponentFixture<FirtsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirtsformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirtsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
