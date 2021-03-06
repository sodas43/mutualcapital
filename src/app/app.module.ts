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
import { ProfileComponent } from './user/profile/profile.component';
import { PortfolioComponent } from './user/portfolio/portfolio.component';
import { PurchaseComponent } from './user/purchase/purchase.component';

import { AdminGuardService } from './shared/services/admin-guard.service';
import { TransService } from './shared/services/trans.service';

import { PaymentService } from './shared/services/payment.service';
//import { CustomToastOption } from './shared/components/custom-toast-option';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { ToastrModule } from 'ngx-toastr';
import { MessageService } from './shared/services/message.service';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { AlltransComponent } from './user/dashboard/alltrans/alltrans.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AuthComponent,
    
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
    ProfileComponent,
    PortfolioComponent,
    PurchaseComponent,
    AlltransComponent       
  ],
  entryComponents: [
    AddComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ForgotPasswordComponent,
    AddSchemeComponent,
    EditComponent,
    DeleteComponent,
    AlltransComponent
    
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
    ToastModule.forRoot(),
    ToastrModule.forRoot({
      enableHtml: true,
      timeOut: 8000,
      positionClass: 'toast-top-full-width'
    }),
    AmChartsModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '14px',
      primaryColour: '#ffffff', 
      secondaryColour: '#ffffff', 
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: true
    })
    
   
  ],
  providers: [
    AuthService,
    CategoryService,
    AuthGuardService,
    SchemeService,    
    AdminGuardService, TransService, PaymentService, MessageService,
    //{ provide: ToastOptions, useClass: CustomToastOption }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
