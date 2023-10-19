import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Pizza } from 'src/app/models/pizza';
import { Produto } from 'src/app/models/produto';
import { PizzaService } from 'src/app/services/pizza.service';
import { ProdutoService } from 'src/app/services/produto.service';


@Component({
  selector: 'app-produtosdetails',
  templateUrl: './produtosdetails.component.html',
  styleUrls: ['./produtosdetails.component.scss']
})
export class ProdutosdetailsComponent {


  @Input() produto: Produto = new Produto();
  @Output() retorno = new EventEmitter<Produto>();

  listaPizza : Pizza[] = []

  produtoService = inject(ProdutoService);
  pizzaService = inject(PizzaService)

  constructor(){
    this.listAllPizzas()
  }

  verificar(){
    this.produtoService.verify(this.produto).subscribe({
      next: produto =>{
        this.retorno.emit(produto);
      },
      error: erro =>{
        alert("Errro, olhar no console");
        console.log(erro)
      }
    })
  }

  byId(item1: any, item2: any){
    if(item1 != null && item2 != null)
      return item1.id === item2.id
    else
      return item1 === item2;
  }

  listAllPizzas(){
    this.pizzaService.listAll().subscribe({
      next: listaPizza => {
        console.log(listaPizza)
        this.listaPizza = listaPizza;
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.log(erro)
      }
    })
  }

}
