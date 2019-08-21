import { Component, OnInit, Output } from '@angular/core';
import { WebsocketService } from "../websocket.service";
import { share } from "rxjs/operators";

@Component({
  selector: 'app-display-price',
  templateUrl: './display-price.component.html',
  styleUrls: ['./display-price.component.scss']
})
export class DisplayPriceComponent implements OnInit {

  constructor(private service: WebsocketService) {}

  @Output() currentPrices:object = {};

  ngOnInit() {
    this.service.subToSocket();
    for (let price in this.service.observableObj) {
      this.service.observableObj[price].pipe(share())
    }
  }
}
