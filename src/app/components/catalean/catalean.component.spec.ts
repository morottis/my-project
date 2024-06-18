import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataleanComponent } from './catalean.component';

describe('CataleanComponent', () => {
  let component: CataleanComponent;
  let fixture: ComponentFixture<CataleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CataleanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CataleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
