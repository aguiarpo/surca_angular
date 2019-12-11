import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAndEditComponent } from './create-and-edit.component';

describe('CreateAndEditComponent', () => {
  let component: CreateAndEditComponent;
  let fixture: ComponentFixture<CreateAndEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAndEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
