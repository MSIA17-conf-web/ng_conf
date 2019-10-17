import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DefaultTemplateComponent } from './default-template/default-template.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultTemplateComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
