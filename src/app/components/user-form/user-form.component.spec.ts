import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthformComponent } from './fourthform.component';

describe('FourthformComponent', () => {
  let component: FourthformComponent;
  let fixture: ComponentFixture<FourthformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourthformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FourthformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
