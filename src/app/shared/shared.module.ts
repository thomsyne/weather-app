import { HistoryComponent } from 'src/app/shared/history/history.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HistoryComponent],
  imports: [CommonModule],
  exports: [HistoryComponent],
})
export class SharedModule {}
