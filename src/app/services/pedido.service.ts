import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  API: string = 'http://localhost:8080/pedido';
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.API}/all`);
  }

  save(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.API}/criar`, pedido);
  }

  update(pedido: Pedido) : Observable<Pedido> {
    return this.http.put<Pedido>(`${this.API}/editar/${pedido.idPedido}`, pedido);
  }

  delete(id: number) : Observable<Pedido> {
    return this.http.delete<Pedido>(`${this.API}/deletar/${id}`);
  }

  verify(pedido: Pedido){
    if(pedido.idPedido){
      return this.update(pedido);
    } else {
      return this.save(pedido);
    }
  }
}
