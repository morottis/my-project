import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCoComponent } from './smart-co.component';

describe('SmartCoComponent', () => {
  let component: SmartCoComponent;
  let fixture: ComponentFixture<SmartCoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartCoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmartCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
