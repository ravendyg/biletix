import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import OrderDao from '@daos/OrderDao';
import { CursService } from 'src/services/Curs';
import { TFullOrder } from '@entities/Order';
// import { paramMissingError, IRequest } from '@shared/constants';

const router = Router();
const orderDao = new OrderDao();
const cursService = new CursService();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


router.get('/:orderLocator', async (req: Request, res: Response) => {
    const { orderLocator } = req.params;
    const order = await orderDao.getOrder(orderLocator);

    return res.status(OK).json({ order });
});

router.get('/', async (req: Request, res: Response) => {
    const orders = await orderDao.getAll();
    const rates = await cursService.getCurs(new Date());
    const fullOrders = orders.map((order): TFullOrder | null => {
        if (order.currency === 'RUB') {
            return {
                ...order,
                priceRub: order.price,
            };
        }
        const rate = rates.get(order.currency);
        if (!rate) {
            return {
                ...order,
                priceRub: null,
            };
        }
        return {
            ...order,
            priceRub: +(order.price * rate).toFixed(2),
        };
    }).filter(order => !!order) as TFullOrder[];

    return res.status(OK).json({ orders: fullOrders });
});

export default router;
