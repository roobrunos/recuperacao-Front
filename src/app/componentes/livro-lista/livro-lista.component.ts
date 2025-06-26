import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule }           from 'primeng/panel';
import { TableModule }     from 'primeng/table';
import { LivroService }    from '../../service/livro.service';
import { Livro }           from '../../models/livro';

@Component({
  selector: 'app-livro-lista',
  standalone: true,
  imports: [
    ButtonModule,
    PanelModule,
    TableModule
  ],
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent {
  listarLivros: Livro[] = [];

  constructor(private livroService: LivroService) {
    this.livroService.listar().subscribe((livros: Livro[]) => this.listarLivros = livros);
  }

  removerLivro(livro: Livro) {
    if (livro.id == null) {
      alert("ID do livro não encontrado. Não é possível remover.");
      return;
    }
    if (confirm(`Tem certeza que deseja remover o livro "${livro.titulo}"?`)) {
      this.livroService.excluir(livro.id).subscribe({
        next: () => {
          this.listarLivros = this.listarLivros.filter(g => g.id !== livro.id);
          alert('Livro removido com sucesso!');
        },
        error: () => alert('Ocorreu um erro ao tentar remover o livro.')
      });
    }
  }
}
