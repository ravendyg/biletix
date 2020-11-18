import { Order } from "../models/Order";
import axios from 'axios';
import { OrderDetails } from "../models/OrderDetails";

// TODO: implement filters.
export type GetOrdersParams = {};
export type OrderService = {
  getOrders: (params: GetOrdersParams) => Promise<Order[]>;
  getOrder: (locator: string) => Promise<OrderDetails>;
};

export class OrderServiceImpl implements OrderService {
  constructor(private baseUrl?: string) {
    if (!baseUrl) {
      throw new Error('missing base url');
    }
   }

  async getOrders(params: GetOrdersParams) {
    const url = `${this.baseUrl}/orders?a=${Math.random()}`;
    const res = await axios.get<{ orders: Order[] }>(url);

    return res.data.orders;
  }

  async getOrder(locator: string) {
    const url = `${this.baseUrl}/orders/${locator}?a=${Math.random()}`;
    const res = await axios.get<{ order: OrderDetails }>(url);

    return res.data.order;
  }
}
