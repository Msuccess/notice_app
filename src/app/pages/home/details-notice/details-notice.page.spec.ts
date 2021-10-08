import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNoticePage } from './details-notice.page';

describe('DetailsNoticePage', () => {
  let component: DetailsNoticePage;
  let fixture: ComponentFixture<DetailsNoticePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsNoticePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsNoticePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
