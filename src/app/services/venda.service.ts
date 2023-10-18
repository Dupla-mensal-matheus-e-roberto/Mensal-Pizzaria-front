import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  API: string = 'http://localhost:8080/venda';
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${this.API}/all`);
  }

  save(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(`${this.API}/criar`, venda);
  }

  update(venda: Venda) : Observable<Venda> {
    return this.http.put<Venda>(`${this.API}/editar/${venda.idVenda}`, venda);
  }

  delete(id: number) : Observable<Venda> {
    return this.http.delete<Venda>(`${this.API}/deletar/${id}`);
  }

  verify(venda: Venda){
    if(venda.idVenda){
      return this.update(venda);
    } else {
      return this.save(venda);
    }
  }
}
