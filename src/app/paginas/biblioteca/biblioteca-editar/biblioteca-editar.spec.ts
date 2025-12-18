import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaEditar } from './biblioteca-editar';

describe('BibliotecaEditar', () => {
  let component: BibliotecaEditar;
  let fixture: ComponentFixture<BibliotecaEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BibliotecaEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotecaEditar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
