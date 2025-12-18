import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BibliotecaService } from '../../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-editar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './biblioteca-editar.html'
})
export class BibliotecaEditarComponent implements OnInit {
  idBiblioteca!: string;
  nomeBiblioteca: string = "";

  constructor(
    private service: BibliotecaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.idBiblioteca = id;
      this.service.buscarPorId(this.idBiblioteca).subscribe({
        next: (biblioteca: any) => { // Tipado como any para evitar TS7006
          this.nomeBiblioteca = biblioteca.nome;
        },
        error: (err: any) => console.error("Erro ao carregar biblioteca", err) // Tipado como any
      });
    }
  }

  salvarEdicao() {
    this.service.atualizar(this.idBiblioteca, this.nomeBiblioteca).subscribe({
      next: () => {
        alert("Alterações salvas no banco de dados!");
        this.router.navigate(['/biblioteca']);
      },
      error: (err: any) => alert("Erro ao salvar: " + err.message) // Tipado como any
    });
  }
}
