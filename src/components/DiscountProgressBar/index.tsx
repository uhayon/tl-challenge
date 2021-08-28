import React from 'react';
import { DiscountProgressConfig, ILineItem } from '../../types';

interface DiscountProcessBarProps {
  total: number;
  lineItems: ILineItem[];
  config: DiscountProgressConfig;
}

const DiscountProcessBar: React.FunctionComponent<DiscountProcessBarProps> = ({
  total,
  lineItems,
  config,
}) => {
  return (
    <div>
      Future Discount Progress{' '}
      {`${total} - ${JSON.stringify(lineItems)} - ${JSON.stringify(config)}`}
    </div>
  );
};

export default DiscountProcessBar;
