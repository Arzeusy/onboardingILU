import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewTemplateComponent } from './pages/new-template/new-template.component';
import { TemplatesComponent } from './pages/templates/templates.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "template", component: NewTemplateComponent },
  { path: "template/:id", component: NewTemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
