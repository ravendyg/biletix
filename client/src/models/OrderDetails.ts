export type OrderDetails = {
  id: string;
  locator: string;
  passengers: {
    firstName:string;
    lastName: string;
  }[];
}
