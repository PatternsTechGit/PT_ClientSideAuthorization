import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepositFundsComponent } from './deposit-funds/deposit-funds.component';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'manage-accounts', component: ManageAccountsComponent },
  { path: 'deposit-funds', component: DepositFundsComponent },
  { path: 'transfer-funds', component: TransferFundsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
