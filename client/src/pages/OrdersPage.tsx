import React, { useEffect, useState } from 'react';
import { OrderItem } from '../components/OrderItem';
import { useDeps } from '../hooks/useDeps';
import { Order } from '../models/Order';

export const OrdersPage: React.FC = () => {
  const { orderService } = useDeps();
  const [orders, setOrders] = useState([] as Order[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fn() {
      try {
        const _orders = await orderService.getOrders({});
        setOrders(_orders);
      } catch {
        setError('Что-то пошло не так');
      }
      setLoading(false);
    }
    fn();
  }, [orderService]);

  let content = null;
  if (loading) {
    content = 'Загрузка...';
  } else if (error) {
    content = error;
  } else {
    content = <table>
      <thead>
        <tr>
          <td>Номер заказа</td>
          <td>Локатор</td>
          <td>Дата обновления</td>
          <td>Стоимость в валюте заказа</td>
          <td>Стоимость в рублях</td>
          <td>Количество пассажиров</td>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => <OrderItem key={order.locator} order={order} />)}
      </tbody>
    </table>;
  }

  return <div>
    Заказы
    <div>
      {content}
    </div>
  </div>
};
