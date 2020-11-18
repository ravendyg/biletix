export interface IOrder {
  id: string;
  locator: string;
  email: string;
  phone: string;
  price: number;
  currency: string;
  date: string | null;
  passengers: number;
}

export type TFullOrder = IOrder & {
  priceRub: number | null;
};

export interface IOrderDetails {
  id: string;
  locator: string;
  passengers: {
    firstName: String;
    lastName: string;
  };
}
