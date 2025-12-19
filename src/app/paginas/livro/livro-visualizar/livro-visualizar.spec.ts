import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroVisualizar } from './livro-visualizar';

describe('LivroVisualizar', () => {
  let component: LivroVisualizar;
  let fixture: ComponentFixture<LivroVisualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivroVisualizar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivroVisualizar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
