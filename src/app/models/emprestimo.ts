import { Usuario } from './usuario';
import { Livro   } from './livro';
import { status  } from './status';

export interface Emprestimo {
  id?: number;
  usuario: Usuario;             
  livro:   Livro;                
  dataEmprestimo:      string;   
  dataDevolucaoPrevista:string;
  status:               status;
}
