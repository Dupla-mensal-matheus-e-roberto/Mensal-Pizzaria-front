import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';


@Component({
  selector: 'app-produtosdetails',
  templateUrl: './produtosdetails.component.html',
  styleUrls: ['./produtosdetails.component.scss']
})
export class ProdutosdetailsComponent {


  @Input() produto: Produto = new Produto();
  @Output() retorno = new EventEmitter<Produto>();

  produtoService = inject(ProdutoService);

  constructor(){

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

}
