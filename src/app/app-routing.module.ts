import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignaturePadPage } from '../pages/signature-pad/signature-pad';
import { SignaturePadPageModule } from '../pages/signature-pad/signature-pad.module';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'signature-pad', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  //{ path: '', redirectTo: '/signature-pad', pathMatch: 'full' },
  { path: 'signature-pad', component: SignaturePadPage }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), SignaturePadPageModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
