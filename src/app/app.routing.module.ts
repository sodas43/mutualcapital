import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BaseComponent } from './base/base.component';
import { CategoryComponent } from './admin/category/category.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { SchemesComponent } from './admin/schemes/schemes.component';
import { UserComponent } from './admin/user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PortfolioComponent } from './user/portfolio/portfolio.component';
import { ProductsComponent } from './user/products/products.component';
import { PurchaseComponent } from './user/purchase/purchase.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'signup', component: AuthComponent },
    { path: 'base', component: BaseComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'category', component: CategoryComponent, canActivate: [AuthGuardService] },
    { path: 'scheme', component: SchemesComponent, canActivate: [AuthGuardService] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuardService] },
    { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuardService] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService] },
    
];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}