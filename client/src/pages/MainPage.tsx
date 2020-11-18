import React from 'react';
import { Link } from 'react-router-dom';

export const MainPage: React.FC = () => {
  return <div>
    Главная страница
    <div>
      <Link to="/orders">Заказы</Link>
    </div>
  </div>;
};
