export type Order = {
  id: string;
  locator: string;
  email: string;
  phone: string;
  price: number;
  priceRub: number | null;
  currency: string;
  date: string | null;
  passengers: number;
};
