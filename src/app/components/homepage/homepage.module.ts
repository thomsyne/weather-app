import { HomePageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HomePageRoutingModule
  ],
})
export class HomePageModule { }
