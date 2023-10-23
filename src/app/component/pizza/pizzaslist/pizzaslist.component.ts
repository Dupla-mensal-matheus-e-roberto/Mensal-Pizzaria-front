import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizzaslist',
  templateUrl: './pizzaslist.component.html',
  styleUrls: ['./pizzaslist.component.scss']
})
export class PizzaslistComponent {

  @Input() modolancamento: boolean = false;
  @Output() retorno = new EventEmitter<Pizza>();

  lista: Pizza[] = [];

  pizzaSelecionadoParaEdicao: Pizza = new Pizza();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  pizzaService = inject(PizzaService);

  constructor(){

    this.listAll();
  }

  listAll(){
    this.pizzaService.listAll().subscribe({
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
    this.pizzaSelecionadoParaEdicao = new Pizza();
 
    this.modalService.open(modal, {size: 'lg'});
  }

  editar(modal: any, pizza: Pizza, indice: number) {

    this.pizzaSelecionadoParaEdicao = Object.assign({}, pizza);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'lg'});
  }

  deletar(pizza: Pizza){
    this.pizzaService.delete(pizza.idPizza).subscribe({
      next: retorno =>{
        this.lista = this.lista.filter(p => p.idPizza !== pizza.idPizza);
        this.retorno.emit(pizza);
      },
      error: erro =>{
        this.lista = this.lista.filter(p => p.idPizza !== pizza.idPizza);
        console.log(erro);
      }
    });
  }

  addOuEditarPizza(pizza: Pizza) {
    this.listAll();

    this.modalService.dismissAll();
  }

  lancamento(pizza: Pizza){
    this.retorno.emit(pizza);
  }

}
