import { HomepageComponent } from './components/homepage/homepage.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'detail',
    loadChildren: async () =>
      ( await import('./components/detailpage/detailpage.module')).DetailPageModule
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: async () =>
      ( await import('./components/homepage/homepage.module')).HomePageModule
  },
  {
    path: '**',
    redirectTo: '',
    component: HomepageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
