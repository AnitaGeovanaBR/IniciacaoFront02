import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LivroService } from '../../../services/livro.service';

@Component({
  selector: 'app-livro-visualizar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './livro-visualizar.html'
})
export class LivroVisualizarComponent implements OnInit {
  livro: any; 

  constructor(
    private route: ActivatedRoute,
    private service: LivroService,
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.buscarPorId(id).subscribe({
        next: (dados: any) => {
          this.livro = dados;
          this.cd.detectChanges();
        },
        error: (err: any) => {
          console.error('Erro ao buscar livro:', err);
          alert('Não foi possível carregar os detalhes do livro.');
        }
      });
    }
  }
}
