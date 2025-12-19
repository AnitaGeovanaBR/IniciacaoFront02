import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { BibliotecaService } from '../../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './biblioteca-editar.html'
})
export class BibliotecaEditarComponent implements OnInit {
  idBiblioteca!: string;
  nomeBiblioteca: string = '';
  nomeBibliotecaOriginal: string = '';

  constructor(
    private service: BibliotecaService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idBiblioteca = id;
      this.service.buscarPorId(id).subscribe(
        (bib: any) => {
          this.nomeBibliotecaOriginal = bib.nome;
          this.nomeBiblioteca = bib.nome;
          this.cdr.detectChanges();
        },
        (err: any) => alert('Erro: ' + err.message)
      );
    }
  }

  salvarEdicao(): void {
    this.service.atualizar(this.idBiblioteca, this.nomeBiblioteca).subscribe({
      next: () => {
        alert('Alterações salvas!');
        this.router.navigate(['/biblioteca']);
      },
      error: (err: any) => alert('Erro ao salvar: ' + err.message)
    });
  }
}
