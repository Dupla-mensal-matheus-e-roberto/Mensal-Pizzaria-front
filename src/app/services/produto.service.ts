import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Produto } from '../models/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  API: string = 'http://localhost:8080/produto';
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.API}/all`);
  }

  save(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.API}/criar`, produto);
  }

  update(produto: Produto) : Observable<Produto> {
    return this.http.put<Produto>(`${this.API}/editar/${produto.idProduto}`, produto);
  }

  delete(id: number) : Observable<Produto> {
    return this.http.delete<Produto>(`${this.API}/deletar/${id}`);
  }

  verify(produto: Produto){
    console.log(produto)
    if(produto.idProduto){
      return this.update(produto);
    } else {
      return this.save(produto);
    }
  }
}
