import { Component }       from '@angular/core';
import { PanelModule }           from 'primeng/panel';
import { FloatLabelModule }      from 'primeng/floatlabel';
import { FormsModule }     from '@angular/forms';
import { ButtonModule }    from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Usuario }         from '../../models/usuario';
import { UsuarioService }  from '../../service/usuario.service';
import { Router }          from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    PanelModule,
    FloatLabelModule,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  novoUsuario: Usuario = { id: 0, nome: '', matricula: '', curso: '' };
  listarUsuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  adicionarCliente() {
    if (!this.novoUsuario.nome.trim()) {
      alert('O nome é obrigatório!');
      return;
    }
    if (!this.novoUsuario.matricula.trim()) {
      alert('A matrícula é obrigatória!');
      return;
    }
    this.usuarioService.salvar(this.novoUsuario).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso!');
        this.atualizarListaUsuarios();
        this.novoUsuario = { id: 0, nome: '', matricula: '', curso: '' };
        this.router.navigateByUrl('/usuarios');
      },
      error: err => {
        if (err.status === 400 || err.status === 409) {
          alert(err.error?.message || 'Já existe um usuário com esse nome!');
        } else {
          alert('Erro inesperado ao cadastrar usuário.');
        }
      }
    });
  }

  atualizarListaUsuarios(): void {
    this.usuarioService.listar().subscribe((usuarios: Usuario[]) => {
      this.listarUsuarios = usuarios;
    });
  }
}

