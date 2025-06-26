import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Livro} from '../../models/livro';
import {LivroService} from '../../service/livro.service';
import {ButtonModule} from 'primeng/button';
import {FloatLabelModule} from 'primeng/floatlabel';
import {PanelModule} from 'primeng/panel';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    PanelModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    CalendarModule
  ],
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css']
})
export class LivroComponent implements OnInit {
  novoLivro: Livro = {
    id: 0,
    titulo: '',
    autor: '',
    editora: '',
    dataPublicacao: new Date()
  };
  listarLivros: Livro[] = [];

  constructor(
    private livroService: LivroService,
    private router:       Router
  ) {}

  ngOnInit(): void {
    this.atualizarListaLivros();
  }

  adicionarLivro(): void {
    if (!this.novoLivro.titulo.trim()) {
      alert('O título é obrigatório!');
      return;
    }
    if (!this.novoLivro.autor.trim()) {
      alert('O autor é obrigatório!');
      return;
    }
    if (!this.novoLivro.editora.trim()) {
      alert('A editora é obrigatória!');
      return;
    }

    this.livroService.salvar(this.novoLivro).subscribe({
      next: () => {
        alert('Livro cadastrado com sucesso!');
        this.atualizarListaLivros();
        this.novoLivro = { id: 0, titulo: '', autor: '', editora: '', dataPublicacao: new Date() };
        this.router.navigateByUrl('/livros');
      },
      error: erro => {
        if (erro.status === 400 || erro.status === 409) {
          alert(erro.error?.message || 'Já existe um livro com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar livro.');
        }
      }
    });
  }

  atualizarListaLivros(): void {
    this.livroService.listar().subscribe(livros => {
      this.listarLivros = livros;
    });
  }
}