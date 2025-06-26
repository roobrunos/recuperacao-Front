import { Component, OnInit }     from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule }          from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule }      from 'primeng/dropdown';
import { ButtonModule }         from 'primeng/button';
import { PanelModule }          from 'primeng/panel';
import { Router, ActivatedRoute } from '@angular/router';
import { EmprestimoService }      from '../../service/emprestimo.service';
import { UsuarioService }         from '../../service/usuario.service';
import { LivroService }         from '../../service/livro.service';
import { Emprestimo }         from '../../models/emprestimo';
import { EmprestimoDTO } from '../../models/emprestimo-dto';
import { Usuario }         from '../../models/usuario';
import { Livro }      from '../../models/livro';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-emprestimo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    PanelModule,
    SelectButtonModule
  ],
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.css']
})
export class EmprestimoComponent implements OnInit {
  form!: FormGroup;

  usuarios: Usuario[] = [];
  livros:   Livro[]   = [];

  usuarioOptions: { label: string; value: number }[] = [];
  livroOptions:   { label: string; value: number }[] = [];
  statusOptions:  { label: string; value: string }[] = [];

  statuses = ['EMPRESTADO', 'DEVOLVIDO', 'ATRASADO'];

  private idParam!: number;

  constructor(
    private svc:   EmprestimoService,
    private usrSvc: UsuarioService,
    private livSvc: LivroService,
    private router: Router,
    private route:  ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      usuarioId:            new FormControl(null, Validators.required),
      livroId:              new FormControl(null, Validators.required),
      dataEmprestimo:       new FormControl(null, Validators.required),
      dataDevolucaoPrevista:new FormControl(null, Validators.required),
      status:               new FormControl(null, Validators.required)
    });

    this.usrSvc.listar().subscribe((u: Usuario[]) => {
      this.usuarioOptions = u.map(x => ({ label: x.nome, value: x.id! }));
    });

    this.livSvc.listar().subscribe((l: Livro[]) => {
      this.livroOptions = l.map(x => ({ label: x.titulo, value: x.id! }));
    });

    this.statusOptions = this.statuses.map(s => ({ label: s, value: s }));

    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');
      if (id && id !== 'novo') {
        this.idParam = +id;
        this.svc.buscarPorId(this.idParam).subscribe((e: Emprestimo) => {
          this.form.patchValue({
            usuarioId:             e.usuario.id,
            livroId:               e.livro.id,
            dataEmprestimo:        new Date(e.dataEmprestimo),
            dataDevolucaoPrevista: new Date(e.dataDevolucaoPrevista),
            status:                e.status
          });
        });
      }
    });
  }

  salvar(): void {
    const fv = this.form.value;
    const dataEmp = (fv.dataEmprestimo as Date).toISOString().slice(0,10);
    const dataDev = (fv.dataDevolucaoPrevista as Date).toISOString().slice(0,10);

    const dto: EmprestimoDTO = {
      usuarioId:               fv.usuarioId,
      livroId:                 fv.livroId,
      dataEmprestimo:          dataEmp,
      dataDevolucaoPrevista:   dataDev,
      status:                  fv.status
    };

    this.svc.salvar(dto)   
    .subscribe({
      next: () => this.router.navigate(['/emprestimos']),
      error: (err: any) => console.error(err)
    });
    
  }
}