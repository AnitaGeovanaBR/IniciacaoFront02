import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BibliotecaService } from '../../../services/biblioteca.service';
import { ChangeDetectorRef } from '@angular/core'; // Importando o change detector para atualizar quando detectar mudanças

@Component({
  selector: 'app-biblioteca-editar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './biblioteca-editar.html'
})
export class BibliotecaEditarComponent implements OnInit {
  idBiblioteca: string = '';
  nomeBiblioteca: string = '';
  nomeBibliotecaOriginal: string = ''; 

  constructor(
    private service: BibliotecaService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef // Injetei o detector de mudanças
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      
      if (id) {
        this.idBiblioteca = id;
        this.carregarDados();
      }
    });
  }

  carregarDados(): void {
    this.service.buscarPorId(this.idBiblioteca).subscribe({
      next: (biblioteca: any) => {
        this.nomeBibliotecaOriginal = biblioteca.nome;
        this.nomeBiblioteca = biblioteca.nome;
        
        // FORÇA O ANGULAR A MOSTRAR O NOME NA TELA IMEDIATAMENTE
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Erro ao carregar:', err)
    });
  }

  salvarEdicao(): void {
    if (!this.idBiblioteca) {
      alert('Erro: O ID da biblioteca não foi carregado corretamente.');
      return;
    }

    this.service.atualizar(this.idBiblioteca, this.nomeBiblioteca).subscribe({
      next: () => {
        alert('Alterações salvas!');
        this.router.navigate(['/biblioteca']);
      },
      error: (err) => alert('Erro ao salvar: ' + err.message)
    });
  }
}
