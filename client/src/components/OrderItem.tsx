import React from 'react';
import { Order } from "../models/Order";
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function formatPrice(order: Order) {
  return `${order.price} (${order.currency})`;
}

export const OrderItem: React.FC<{order: Order}> = (props) => {
  const { order } = props;
  const dateStr = order.date ? dayjs(order.date).format('YYYY-MM-DD') : '';
  const priceRub = order.priceRub ? order.priceRub : formatPrice(order);

  return <tr>
    <td>{order.id}</td>
    <td><Link to={`/order/${order.locator}`}>{order.locator}</Link></td>
    <td>{dateStr}</td>
    <td>{formatPrice(order)}</td>
    <td>{priceRub}</td>
    <td>{order.price}</td>
    <td>{order.passengers}</td>
  </tr>;
}
