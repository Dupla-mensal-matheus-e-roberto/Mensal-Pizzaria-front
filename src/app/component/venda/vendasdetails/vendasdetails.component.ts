import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Funcionario } from 'src/app/models/funcionario';
import { Pedido } from 'src/app/models/pedido';
import { Venda } from 'src/app/models/venda';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-vendasdetails',
  templateUrl: './vendasdetails.component.html',
  styleUrls: ['./vendasdetails.component.scss']
})
export class VendasdetailsComponent {

  @Input() venda: Venda = new Venda();
  @Input() pedido: Pedido = new Pedido();
  @Output() retorno = new EventEmitter<Venda>();

  lista: Pedido[] = [];
  pedidoSelecionado!: Pedido;

  listaFuncionario: Funcionario[] = [];
  funcionarioSelecionado!: Funcionario;

  vendaService = inject(VendaService);

  ngModal = inject(NgbModal)

  constructor(private pedidoService: PedidoService, private funcionarioService: FuncionarioService){
    this.listAllPedido();
    this.listAllFuncionario();
  }

  byId(item1: any, item2: any){
    if(item1 != null && item2 != null)
      return item1.id === item2.id
    else
      return item1 === item2;
  }

  listAllFuncionario(){
    this.funcionarioService.listAll().subscribe({
      next: listaFuncionario => {
        console.log(listaFuncionario)
        this.listaFuncionario = listaFuncionario;
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.log(erro)
      }
    })
  }

  listAllPedido(){
    this.pedidoService.listAll().subscribe({
      next: lista => {
        console.log(lista)
        this.lista = lista;
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.log(erro);
      }
    })
  }

  verificar(){
    this.vendaService.verify(this.venda).subscribe({
      next: venda =>{
        this.retorno.emit(venda);
        this.ngModal.dismissAll()
      },
      error: erro =>{
        alert("Errro, olhar no console");
        console.log(erro)
      }
    })
  }


}
