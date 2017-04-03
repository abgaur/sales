import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridModule} from "ag-grid-angular/main";
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { FlashMessagesModule} from 'angular2-flash-messages';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { AuthService } from './services/auth.service';
import { DashboardService } from './services/dashboard.service';
import { ValidateService} from './services/validate.service';
import { UploadService } from './services/upload.service';

import { AuthGuard} from './guard/auth.guard';
import { ClientdataComponent } from './components/clientdata/clientdata.component';
import { UploadComponent } from './components/upload/upload.component';
import { MyGridApplicationComponent } from './components/my-grid-application/my-grid-application.component';
import { RedComponentComponent } from './components/red-component/red-component.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'clientdata', component: ClientdataComponent},
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard]},
  { path: 'grid', component: MyGridApplicationComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ClientdataComponent,
    UploadComponent,
    FileSelectDirective,
    MyGridApplicationComponent,
    RedComponentComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    AgGridModule.withComponents([RedComponentComponent])
  ],
  providers: [ValidateService, AuthService, AuthGuard, UploadService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
