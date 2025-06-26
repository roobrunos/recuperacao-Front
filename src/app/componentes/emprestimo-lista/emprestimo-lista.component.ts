import { Component, OnInit } from '@angular/core';
import { Router }           from '@angular/router';
import { CommonModule }     from '@angular/common';
import { TableModule }      from 'primeng/table';
import { ButtonModule }     from 'primeng/button';
import { EmprestimoService } from '../../service/emprestimo.service';
import { Emprestimo }       from '../../models/emprestimo';

@Component({
  selector: 'app-emprestimo-lista',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './emprestimo-lista.component.html',
  styleUrls: ['./emprestimo-lista.component.css']
})
export class EmprestimoListaComponent implements OnInit {
  emprestimos: Emprestimo[] = [];

  constructor(
    private svc: EmprestimoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.svc.listar().subscribe((data: Emprestimo[]) => this.emprestimos = data);
  }

  editar(id: number): void {
    this.router.navigate(['/emprestimos', id]);
  }

  excluir(id: number): void {
    if (!confirm('Confirma exclusão?')) return;
    this.svc.excluir(id).subscribe(() => this.carregar());
  }

  novo(): void {
    this.router.navigate(['/emprestimos', 'novo']);
  }
}
