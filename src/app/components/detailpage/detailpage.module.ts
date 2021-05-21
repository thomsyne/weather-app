import { DetailPageRoutingModule } from './detailpage-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailpageComponent } from './detailpage.component';
import { ChartsModule } from 'ng2-charts';
import { HistoryComponent } from 'src/app/shared/history/history.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DetailpageComponent],
  imports: [
    CommonModule,
    DetailPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    SharedModule
  ],
})
export class DetailPageModule { }
