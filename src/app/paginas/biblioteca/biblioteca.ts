import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-biblioteca',
  standalone: false,
  templateUrl: './biblioteca.html',
  styleUrls: ['./biblioteca.css']
})
export class BibliotecaComponent implements OnInit {
  bibliotecas: any[] = [];
  showForm = false;
  editingId: string | null = null;
  loading = false;
  form = {
    nome: ''
  };

  constructor(
    private bibliotecaService: BibliotecaService,
    private router: Router,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadBibliotecas();
  }

  loadBibliotecas(): void {
    this.loading = true;
    this.bibliotecaService.getBibliotecas().subscribe({
      next: (data) => {
        this.bibliotecas = Array.isArray(data) ? data : (data.value || data);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar bibliotecas:', err);
        this.notificationService.error(err.message || 'Erro ao carregar bibliotecas');
        this.loading = false;
      }
    });
  }

  openForm(biblioteca?: any): void {
    if (biblioteca) {
      this.editingId = biblioteca.idBiblioteca;
      this.form.nome = biblioteca.nome;
    } else {
      this.editingId = null;
      this.form.nome = '';
    }
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.form.nome = '';
  }

  saveBiblioteca(): void {
    if (!this.form.nome.trim()) {
      this.notificationService.warning('Preencha o nome');
      return;
    }

    this.loading = true;

    if (this.editingId) {
      this.bibliotecaService.updateBiblioteca(this.editingId, { nome: this.form.nome }).subscribe({
        next: () => {
          this.notificationService.success('Biblioteca atualizada com sucesso!');
          this.closeForm();
          this.loadBibliotecas();
        },
        error: (err) => {
          console.error('Erro ao atualizar:', err);
          this.notificationService.error(err.message || 'Erro ao atualizar biblioteca');
          this.loading = false;
        }
      });
    } else {
      this.bibliotecaService.createBiblioteca({ nome: this.form.nome }).subscribe({
        next: () => {
          this.notificationService.success('Biblioteca criada com sucesso!');
          this.closeForm();
          this.loadBibliotecas();
        },
        error: (err) => {
          console.error('Erro ao criar:', err);
          this.notificationService.error(err.message || 'Erro ao criar biblioteca');
          this.loading = false;
        }
      });
    }
  }

  deleteBiblioteca(id: string): void {
    if (confirm('Tem certeza que deseja deletar esta biblioteca?')) {
      this.loading = true;
      this.bibliotecaService.deleteBiblioteca(id).subscribe({
        next: () => {
          this.notificationService.success('Biblioteca deletada com sucesso!');
          this.loadBibliotecas();
        },
        error: (err) => {
          console.error('Erro ao deletar:', err);
          this.notificationService.error(err.message || 'Erro ao deletar biblioteca');
          this.loading = false;
        }
      });
    }
  }
}
