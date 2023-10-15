import { Component, EventEmitter, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionarioslist',
  templateUrl: './funcionarioslist.component.html',
  styleUrls: ['./funcionarioslist.component.scss']
})
export class FuncionarioslistComponent {

  retorno = new EventEmitter<Funcionario>();

  lista: Funcionario[] = [];

  funcionarioSelecionadoParaEdicao: Funcionario = new Funcionario();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  funcionarioService = inject(FuncionarioService);

  constructor(){

    this.listAll();
  }

  listAll(){
    this.funcionarioService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }


  adicionar(modal : any){
    this.funcionarioSelecionadoParaEdicao = new Funcionario();
 
    this.modalService.open(modal, {size: 'lg'});
  }

  editar(modal: any, funcionario: Funcionario, indice: number) {
    this.funcionarioSelecionadoParaEdicao = Object.assign({}, funcionario);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'lg'});
  }

  deletar(funcionario: Funcionario){
    this.funcionarioService.delete(funcionario.idFuncionario).subscribe({
      next: retorno =>{
        this.lista = this.lista.filter(f => f.idFuncionario !== funcionario.idFuncionario);
        this.retorno.emit(funcionario);
      },
      error: erro =>{
        this.lista = this.lista.filter(f => f.idFuncionario !== funcionario.idFuncionario);
        console.log(erro);
      }
    });
  }

  addOuEditarFuncionario(funcionario: Funcionario) {
    this.listAll();

    this.modalService.dismissAll();
  }
}
