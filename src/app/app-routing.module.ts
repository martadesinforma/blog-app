import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { TermsAndConditionComponent } from './pages/terms-and-condition/terms-and-condition.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'category/:category/:id', component: SingleCategoryComponent},
  {path: 'post/:id', component:SinglePostComponent},
  {path: 'about', component: AboutUsComponent},
  {path: 'term-condictions', component:TermsAndConditionComponent},
  /* {path: 'contact', component: ContactUsComponent}, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
