import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiaxesComponentEmisiones } from './multiaxes.emisiones.component';

describe('MultiaxesComponentEmisiones', () => {
  let component: MultiaxesComponentEmisiones;
  let fixture: ComponentFixture<MultiaxesComponentEmisiones>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiaxesComponentEmisiones ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiaxesComponentEmisiones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
