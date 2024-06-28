import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthformComponent } from './fifthform.component';

describe('FifthformComponent', () => {
  let component: FifthformComponent;
  let fixture: ComponentFixture<FifthformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FifthformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FifthformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
