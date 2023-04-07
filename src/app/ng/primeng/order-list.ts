import {NgModule} from '@angular/core';
import {OrderList, OrderListModule} from "primeng/orderlist";

@NgModule({
  exports: [OrderListModule]
})
export class PrimeOrderListModule {
}

export const PrimeOrderList = OrderList;
export type PrimeOrderList = OrderList;
