import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDeps } from '../hooks/useDeps';
import { OrderDetails } from '../models/OrderDetails';

export const OrderPage: React.FC = () => {
  const { orderService } = useDeps();
  const { orderLocator } = useParams<{ orderLocator: string }>();
  const [order, setOrder] = useState(null as OrderDetails | null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fn() {
      try {
        const _order = await orderService.getOrder(orderLocator);
        setOrder(_order);
      } catch {
        setError('Что-то пошло не так');
      }
      setLoading(false);
    }
    fn();
  }, [orderService, orderLocator]);

  let content = null;
  if (loading) {
    content = 'Загрузка ...';
  } else if (error) {
    content = error;
  } else if (order === null) {
    content = 'Заказ не найден';
  } else {
    content = <table>
      <thead>
        <tr>
          <td>Номер заказа</td>
          <td>Локатор</td>
          <td>Имя пассажира</td>
          <td>Фамилия пассажира</td>
        </tr>
      </thead>
      <tbody>
        {order.passengers.map((ps, id) => <tr key={ps.firstName + ps.lastName + id}>
          <td>{order.id}</td>
          <td>{order.locator}</td>
          <td>{ps.firstName}</td>
          <td>{ps.lastName}</td>
        </tr>)}
      </tbody>
    </table>
  }

  return <div>
    Заказ
    <div>
      {content}
    </div>
    <div>
      <Link to="/orders">К списку заказов</Link>
    </div>
  </div>
};
