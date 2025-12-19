import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './biblioteca.html'
})
export class Biblioteca implements OnInit {

  listaBibliotecas: any[] = [];

  constructor(
    private service: BibliotecaService,
    private router: Router,
    private route: ActivatedRoute, 
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  
  carregarDados(): void {
    this.service.listarTodas().subscribe({
      next: (dados) => {
        this.listaBibliotecas = dados;
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Erro ao carregar bibliotecas:', err)
    });
  }


  excluirBiblioteca(id: string): void {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta biblioteca?');
    if (!confirmar) return;

    this.service.excluir(id).subscribe({
      next: () => {
        alert('Excluído com sucesso!');
        this.carregarDados();
      },
      error: (err) => alert('Erro ao excluir: ' + err.message)
    });
  }
  irParaDetalhes(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
