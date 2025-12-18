import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-livro',
  standalone: false,
  templateUrl: './livro.html',
  styleUrls: ['./livro.css']
})
export class LivroComponent implements OnInit {
  livros: any[] = [];
  showForm = false;
  editingId: string | null = null;
  loading = false;
  form = {
    nome: '',
    autor: '',
    edicao: 1,
    editora: '',
    isbn: '',
    descricao: '',
    dataPublicacao: ''
  };

  constructor(
    private livroService: LivroService,
    private router: Router,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadLivros();
  }

  loadLivros(): void {
    this.loading = true;
    this.livroService.getLivros().subscribe({
      next: (data) => {
        this.livros = Array.isArray(data) ? data : (data.value || data);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar livros:', err);
        this.notificationService.error(err.message || 'Erro ao carregar livros');
        this.loading = false;
      }
    });
  }

  openForm(livro?: any): void {
    if (livro) {
      this.editingId = livro.idLivro;
      this.form = { ...livro };
    } else {
      this.editingId = null;
      this.form = {
        nome: '',
        autor: '',
        edicao: 1,
        editora: '',
        isbn: '',
        descricao: '',
        dataPublicacao: ''
      };
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.form = {
      nome: '',
      autor: '',
      edicao: 1,
      editora: '',
      isbn: '',
      descricao: '',
      dataPublicacao: ''
    };
  }

  saveLivro(): void {
    if (!this.form.nome.trim() || !this.form.autor.trim()) {
      this.notificationService.warning('Campo obrigatório vazio');
      return;
    }

    this.loading = true;

    if (this.editingId) {
      this.livroService.updateLivro(this.editingId, this.form).subscribe({
        next: () => {
          this.notificationService.success('Livro atualizado com sucesso!');
          this.closeForm();
          this.loadLivros();
        },
        error: (err) => {
          console.error('Erro ao atualizar:', err);
          this.notificationService.error(err.message || 'Erro ao atualizar livro');
          this.loading = false;
        }
      });
    } else {
      this.livroService.createLivro(this.form).subscribe({
        next: () => {
          this.notificationService.success('Livro criado com sucesso!');
          this.closeForm();
          this.loadLivros();
        },
        error: (err) => {
          console.error('Erro ao criar:', err);
          this.notificationService.error(err.message || 'Erro ao criar livro');
          this.loading = false;
        }
      });
    }
  }

  deleteLivro(id: string): void {
    if (confirm('Tem certeza que deseja deletar este livro?')) {
      this.loading = true;
      this.livroService.deleteLivro(id).subscribe({
        next: () => {
          this.notificationService.success('Livro deletado com sucesso!');
          this.loadLivros();
        },
        error: (err) => {
          console.error('Erro ao deletar:', err);
          this.notificationService.error(err.message || 'Erro ao deletar livro');
          this.loading = false;
        }
      });
    }
  }
}
