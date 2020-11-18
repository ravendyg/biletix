import { IOrder, IOrderDetails } from '@entities/Order';
import { resolve } from 'path';
import { Db } from './Db';



export interface IOrderDao {
    getAll: () => Promise<IOrder[]>;
    getOrder: (locator: string) => Promise<IOrderDetails | null>;
}

const ordersQuery = `
SELECT
    o.ID AS id
    , o.locator
    , o.email
    , o.phone
    , o.price
    , o.currency
    , count(p.order_id) as passengers
    , MAX(p.date_insert) as date
FROM orders AS o
    LEFT JOIN order_passengers AS p
        ON o.id = p.order_id
GROUP BY o.ID
;`

const orderQuery = `
SELECT
    ID as id,
    locator
FROM orders
WHERE locator = ?
LIMIT 1
`;

const passengersQuery = `
SELECT
    name_first AS firstName,
    name_second AS lastName
FROM order_passengers
WHERE order_id = ?
`;

class OrderDao extends Db implements IOrderDao {
    async getAll(): Promise<IOrder[]> {
        const con = super.getConnection();
        return new Promise((resolve, reject) => {
            con.query(ordersQuery, (err, res) => {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }

    async getOrder(locator: string): Promise<IOrderDetails | null> {
        const con = super.getConnection();
        return new Promise((resolve, reject) => {
            con.query(orderQuery, [locator], (err, orderRes) => {
                if (err) {
                    return reject(err);
                }
                if (orderRes.length === 0) {
                    return resolve(null);
                }
                con.query(passengersQuery, [orderRes[0].id], (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log(res)
                    return resolve({
                        ...orderRes[0],
                        passengers: res,
                    });
                });
            });
        });
    }
}

export default OrderDao;
