import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Livro } from './inicio';

describe('Livro', () => {
  let component: Livro;
  let fixture: ComponentFixture<Livro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Livro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Livro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
