import  React, { useContext } from 'react';
import { OrderService } from '../services/orderService';

export type Deps = {
  orderService: OrderService;
};


const DepsContext = React.createContext<Deps>(null as any);

export function useDeps() {
  return useContext(DepsContext);
}

export const DepsProvider: React.FC<{ deps: Deps }> =
  ({ children, deps }) => {
    return <DepsContext.Provider value={deps}>
      {children}
    </DepsContext.Provider>;
  };
