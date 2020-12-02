import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WxBaseListComponent } from './wxbase-list.component';

describe('BaseListComponent', () => {
  let component: WxBaseListComponent;
  let fixture: ComponentFixture<WxBaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WxBaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WxBaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
