import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Venda } from 'src/app/models/venda';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-vendasdetails',
  templateUrl: './vendasdetails.component.html',
  styleUrls: ['./vendasdetails.component.scss']
})
export class VendasdetailsComponent {

  @Input() venda: Venda = new Venda();
  @Output() retorno = new EventEmitter<Venda>();

  vendaService = inject(VendaService);

  constructor(){

  }

  verificar(){
    this.vendaService.verify(this.venda).subscribe({
      next: venda =>{
        this.retorno.emit(venda);
      },
      error: erro =>{
        alert("Errro, olhar no console");
        console.log(erro)
      }
    })
  }


}
