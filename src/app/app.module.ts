import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailPageModule } from './components/detailpage/detailpage.module';
import { HomePageModule } from './components/homepage/homepage.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageModule,
    DetailPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
