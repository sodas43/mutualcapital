import { AuthService } from './shared/services/auth.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from './base/base.component';
import { CategoryComponent } from './admin/category/category.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { BnavbarComponent } from './bnavbar/bnavbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { CategoryService } from './shared/services/category.service';
import { AddComponent } from './admin/category/dialog/add/add/add.component';
import { EditDialogComponent } from './admin/category/dialog/edit/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './admin/category/dialog/delete/delete-dialog/delete-dialog.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { ForgotPasswordComponent } from './auth/dialog/forgot-password/forgot-password.component';
import { SchemesComponent } from './admin/schemes/schemes.component';
import { SchemeService } from './shared/services/scheme.service';
import { EditComponent } from './admin/schemes/dialog/edit/edit.component';
import { DeleteComponent } from './admin/schemes/dialog/delete/delete.component';
import { AddSchemeComponent } from './admin/schemes/dialog/add/add.component';
import { UserComponent } from './admin/user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PortfolioComponent } from './user/portfolio/portfolio.component';
import { PurchaseComponent } from './user/purchase/purchase.component';
import { ProductsComponent } from './user/products/products.component';
import { AdminGuardService } from './shared/services/admin-guard.service';
import { TransService } from './shared/services/trans.service';
//import { CustomToastOption } from './shared/components/custom-toast-option';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AuthComponent,
    BaseComponent,
    CategoryComponent,
    DashboardComponent,
    BnavbarComponent,
    FooterComponent,    
    AddComponent, 
    EditDialogComponent,
    DeleteDialogComponent,
    ForgotPasswordComponent,
    SchemesComponent,
    AddSchemeComponent,
    EditComponent,
    DeleteComponent,
    UserComponent,
    ProfileComponent,
    PortfolioComponent,
    PurchaseComponent,
    ProductsComponent
  ],
  entryComponents: [
    AddComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ForgotPasswordComponent,
    AddSchemeComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule.forRoot()
    
   
  ],
  providers: [
    AuthService,
    CategoryService,
    AuthGuardService,
    SchemeService,    
    AdminGuardService, TransService,
    //{ provide: ToastOptions, useClass: CustomToastOption }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
