import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoticePage } from './add-notice.page';

describe('AddNoticePage', () => {
  let component: AddNoticePage;
  let fixture: ComponentFixture<AddNoticePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNoticePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoticePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
