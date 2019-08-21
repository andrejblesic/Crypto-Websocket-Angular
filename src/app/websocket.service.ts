import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { BehaviorSubject } from "rxjs";
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private priceSocket = webSocket("wss://ws-feed.pro.coinbase.com");

  private product_ids = []; //["BTC-USD", "BTC-EUR", "ETH-USD", "ETH-EUR", "ETH-BTC", "LTC-USD", "LTC-EUR", "LTC-BTC", "XRP-USD", "XRP-EUR", "XRP-BTC", "BCH-USD", "BCH-EUR", "BCH-BTC"];

  public observableObj:object = {};

  handleMessage(message) {
    if (message.price) {
      if (!this.observableObj[message.product_id]) {
        this.observableObj[message.product_id] = new BehaviorSubject<any>("");
        this.observableObj[message.product_id].next(message.price);
      } else {
        this.observableObj[message.product_id].next(message.price);
      }
    }
  }

  subToSocket() {
    fetch("https://api.pro.coinbase.com/products")
      .then(response => response.json())
      .then(json => {
        for (let item of json) {
          this.product_ids.push(item.id);
        }
        this.priceSocket.next({
          "type": "subscribe",
          "product_ids": this.product_ids,
          "channels": [
              "matches"
          ]
        });
        this.priceSocket.subscribe(
          message => this.handleMessage(message),
          error => console.log(error),
          () => console.log("completed")
        )
      });
  }

  ngOnDestroy() {
    this.priceSocket.unsubscribe();
  }
}
