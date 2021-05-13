import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailPageModule } from './components/detailpage/detailpage.module';
import { HomePageModule } from './components/homepage/homepage.module';
import { addHistoryReducer } from './store/history.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({history: addHistoryReducer}),
    AppRoutingModule,
    HomePageModule,
    DetailPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
