import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './components/form/form.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';


//Establezco las rutas de los componentes

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo: 'home'},
  {path: "home", component: HomeComponent},
  {path: "newuser", component: FormComponent},
  {path: "user/:_id", component: ViewProfileComponent},
  {path: "updateuser/:_id", component: FormComponent},
  {path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
