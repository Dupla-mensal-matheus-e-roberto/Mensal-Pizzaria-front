import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/sistema/login/login.component';
import { IndexComponent } from './component/layout/index/index.component';
import { ClienteslistComponent } from './component/cliente/clienteslist/clienteslist.component';
import { FuncionarioslistComponent } from './component/funcionario/funcionarioslist/funcionarioslist.component';
import { PedidoslistComponent } from './component/pedido/pedidoslist/pedidoslist.component';
import { PizzaslistComponent } from './component/pizza/pizzaslist/pizzaslist.component';
import { ProdutoslistComponent } from './component/produto/produtoslist/produtoslist.component';
import { VendaslistComponent } from './component/venda/vendaslist/vendaslist.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full'},
  { path: "login", component: LoginComponent},
  {
    path: "admin", component: IndexComponent, children: [
      { path: "cliente", component: ClienteslistComponent},
      { path: "funcionario", component: FuncionarioslistComponent},
      { path: "pedido", component: PedidoslistComponent},
      { path: "pizza", component: PizzaslistComponent},
      { path: "produto", component: ProdutoslistComponent},
      { path: "venda", component: VendaslistComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
