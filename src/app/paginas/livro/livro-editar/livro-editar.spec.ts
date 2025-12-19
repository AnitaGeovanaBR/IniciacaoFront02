import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroEditar } from './livro-editar';

describe('LivroEditar', () => {
  let component: LivroaEditar;
  let fixture: ComponentFixture<LivroEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivroEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivroEditar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
