import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from './stat-card/stat-card.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgChartsModule,
    CommonModule,
    StatCardComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
