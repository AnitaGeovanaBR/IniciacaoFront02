import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { BibliotecaComponent } from './biblioteca';

describe('BibliotecaComponent', () => {
  let component: BibliotecaComponent;
  let fixture: ComponentFixture<BibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [BibliotecaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});