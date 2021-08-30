import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalResumeComponent } from './personal-resume.component';

describe('PersonalResumeComponent', () => {
  let component: PersonalResumeComponent;
  let fixture: ComponentFixture<PersonalResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
