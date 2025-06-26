import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BibliotecaRodrigoFront';

  items = [
    {
      label: '📚 Livros',
      icon: 'pi pi-book',
      items: [
        { 
          label: '📋 Listar Livros', 
          icon: 'pi pi-list',
          routerLink: '/livros' 
        },
        { 
          label: '➕ Novo Livro', 
          icon: 'pi pi-plus',
          routerLink: '/livros/novo' 
        }
      ]
    },
    {
      label: '👥 Usuários',
      icon: 'pi pi-users',
      items: [
        { 
          label: '📋 Listar Usuários', 
          icon: 'pi pi-list',
          routerLink: '/usuarios' 
        },
        { 
          label: '➕ Novo Usuário', 
          icon: 'pi pi-plus',
          routerLink: '/usuarios/novo' 
        }
      ]
    },
    {
      label: '📖 Empréstimos',
      icon: 'pi pi-calendar',
      items: [
        { 
          label: '📋 Listar Ativos', 
          icon: 'pi pi-list',
          routerLink: '/emprestimos' 
        },
        { 
          label: '➕ Novo Empréstimo', 
          icon: 'pi pi-plus',
          routerLink: '/emprestimos/novo' 
        }
      ]
    }
  ];

}