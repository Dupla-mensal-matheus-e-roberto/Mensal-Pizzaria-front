import { Injectable, inject } from '@angular/core';
import { Pizza } from '../models/pizza';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  API: string = 'http://localhost:8080/pizza';
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${this.API}/all`);
  }

  save(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(`${this.API}/criar`, pizza);
  }

  update(pizza: Pizza) : Observable<Pizza> {
    return this.http.put<Pizza>(`${this.API}/editar/${pizza.idPizza}`, pizza);
  }

  delete(id: number) : Observable<Pizza> {
    return this.http.delete<Pizza>(`${this.API}/deletar/${id}`);
  }

  verify(pizza: Pizza){
    if(pizza.idPizza){
      return this.update(pizza);
    } else {
      return this.save(pizza);
    }
  }
}
