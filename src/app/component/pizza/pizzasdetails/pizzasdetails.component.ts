import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizzasdetails',
  templateUrl: './pizzasdetails.component.html',
  styleUrls: ['./pizzasdetails.component.scss']
})
export class PizzasdetailsComponent {

  @Input() pizza: Pizza = new Pizza();
  @Output() retorno = new EventEmitter<Pizza>();

  pizzaService = inject(PizzaService);

  constructor(){

  }

  verificar(){
    this.pizzaService.verify(this.pizza).subscribe({
      next: pizza =>{
        this.retorno.emit(pizza);
      },
      error: erro =>{
        alert(erro.error);
        console.log(erro.error)
      }
    })
  }

}
