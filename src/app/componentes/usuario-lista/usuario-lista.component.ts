import { Component }       from '@angular/core';
import { PanelModule }           from 'primeng/panel';
import { TableModule }     from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UsuarioService }  from '../../service/usuario.service';
import { Usuario }         from '../../models/usuario';

@Component({
  selector: 'app-usuario-lista',
  standalone: true,
  imports: [
    PanelModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent {
  listarUsuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.listar().subscribe((usuarios: Usuario[]) => this.listarUsuarios = usuarios);
  }

  removerUsuario(usuario: Usuario) {
    if (usuario.id == null) {
      alert("ID do usuário não encontrado. Não é possível remover.");
      return;
    }
    if (confirm(`Tem certeza que deseja remover o usuário "${usuario.nome}"?`)) {
      this.usuarioService.excluir(usuario.id).subscribe({
        next: () => {
          this.listarUsuarios = this.listarUsuarios.filter(g => g.id !== usuario.id);
          alert('Usuário removido com sucesso!');
        },
        error: () => alert('Ocorreu um erro ao tentar remover o usuário.')
      });
    }
  }
}
