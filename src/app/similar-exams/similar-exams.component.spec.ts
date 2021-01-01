import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarExamsComponent } from './similar-exams.component';

describe('SimilarExamsComponent', () => {
  let component: SimilarExamsComponent;
  let fixture: ComponentFixture<SimilarExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
