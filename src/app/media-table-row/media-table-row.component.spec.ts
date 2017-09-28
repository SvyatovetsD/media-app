import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTableRowComponent } from './media-table-row.component';

describe('MediaTableRowComponent', () => {
  let component: MediaTableRowComponent;
  let fixture: ComponentFixture<MediaTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
