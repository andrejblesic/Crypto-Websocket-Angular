import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayPriceComponent } from './display-price/display-price.component';
import { WebsocketService } from "./websocket.service";
import { PriceComponent } from './price/price.component'

@NgModule({
  declarations: [
    AppComponent,
    DisplayPriceComponent,
    PriceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
