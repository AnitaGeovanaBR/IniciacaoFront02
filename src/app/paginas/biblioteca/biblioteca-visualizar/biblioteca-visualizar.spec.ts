import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaVisualizar } from './biblioteca-visualizar';

describe('BibliotecaVisualizar', () => {
  let component: BibliotecaVisualizar;
  let fixture: ComponentFixture<BibliotecaVisualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BibliotecaVisualizar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotecaVisualizar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
