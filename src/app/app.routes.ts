import { Routes } from '@angular/router';
import {EmprestimoComponent} from './componentes/emprestimo/emprestimo.component';
import {UsuarioComponent} from './componentes/usuario/usuario.component';
import {LivroComponent} from './componentes/livro/livro.component';
import {LivroListaComponent} from './componentes/livro-lista/livro-lista.component';
import {UsuarioListaComponent} from './componentes/usuario-lista/usuario-lista.component';
import {EmprestimoListaComponent} from './componentes/emprestimo-lista/emprestimo-lista.component';

export const routes: Routes = [
  { path: 'livros', component: LivroListaComponent },
  { path: 'livros/novo', component: LivroComponent },

  { path: 'usuarios', component: UsuarioListaComponent },
  { path: 'usuarios/novo', component: UsuarioComponent },

  { path: 'emprestimos', component: EmprestimoListaComponent },
  { path: 'emprestimos/novo', component: EmprestimoComponent },
  { path: 'emprestimos/:id', component: EmprestimoComponent },

  { path: '', redirectTo: 'emprestimos', pathMatch: 'full' }
];
