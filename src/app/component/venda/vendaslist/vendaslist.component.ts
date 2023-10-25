import { Component, EventEmitter, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';


@Component({
  selector: 'app-vendaslist',
  templateUrl: './vendaslist.component.html',
  styleUrls: ['./vendaslist.component.scss']
})
export class VendaslistComponent {

  retorno = new EventEmitter<Venda>();

  lista: Venda[] = [];

  vendaSelecionadoParaEdicao: Venda = new Venda();
  indiceSelecionadoParaEdicao!: number;

  busca:string = "";
  listaFiltrada: Venda[] = [];

  modalService = inject(NgbModal);
  vendaService = inject(VendaService);

  constructor(){

    this.listAll();
  }

  listAll(){
    this.vendaService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
        this.listaFiltrada = lista;
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  filtra(){
    if(this.busca.length > 2){
      this.listaFiltrada = [];
      for(let i = 0; i< this.lista.length; i++){
          if(this.lista[i].funcionario.nome.toLowerCase().indexOf(this.busca.toLowerCase())>=0){
            this.listaFiltrada.push(this.lista[i])
          }
        }
    } 
    else{
      this.listaFiltrada = this.lista;
    }
  }

  adicionar(modal : any){
    this.vendaSelecionadoParaEdicao = new Venda();
 
    this.modalService.open(modal, {size: 'lg'});
  }

  editar(modal: any, venda: Venda, indice: number) {

    this.vendaSelecionadoParaEdicao = Object.assign({}, venda);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'lg'});
  }

  deletar(venda: Venda){
    this.vendaService.delete(venda.idVenda).subscribe({
      next: retorno =>{
        this.lista = this.lista.filter(p => p.idVenda !== venda.idVenda);
        this.retorno.emit(venda);
      },
      error: erro =>{
        this.lista = this.lista.filter(p => p.idVenda !== venda.idVenda);
        console.log(erro);
      }
    });
  }

  addOuEditarVenda(venda: Venda) {
    this.listAll();

    this.modalService.dismissAll();
  }

}
