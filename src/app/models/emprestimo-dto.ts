

import { status } from './status';

export interface EmprestimoDTO {
  usuarioId: number;
  livroId: number;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  status: status;
}

  