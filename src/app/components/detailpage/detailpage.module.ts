import { DetailPageRoutingModule } from './detailpage-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailpageComponent } from './detailpage.component';

@NgModule({
  declarations: [DetailpageComponent],
  imports: [
    CommonModule,
    DetailPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class DetailPageModule { }
