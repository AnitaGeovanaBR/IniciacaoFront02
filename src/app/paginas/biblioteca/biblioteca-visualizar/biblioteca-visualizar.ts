import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BibliotecaService } from '../../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-visualizar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './biblioteca-visualizar.html',
  styleUrls: ['./biblioteca-visualizar.css']
})
export class BibliotecaVisualizarComponent implements OnInit {
  biblioteca: any; 

  constructor(
    private route: ActivatedRoute,
    private service: BibliotecaService,
    private cd: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.buscarPorId(id).subscribe({
        next: (dados) => {
          this.biblioteca = dados;
          this.cd.detectChanges();
        },
        error: (err) => console.error(err)
      });
    }
  }
}
