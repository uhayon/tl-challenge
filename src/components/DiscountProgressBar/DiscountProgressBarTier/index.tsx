import { FC } from 'react';
import styles from './discount-progress-bar-tier.module.scss';

interface DiscountProgressBarTierProps {
  minValue: number;
  maxValue: number;
  currentValue: number;
}

const DiscountProgressBarTier: FC<DiscountProgressBarTierProps> = ({
  minValue,
  maxValue,
  currentValue,
}) => {
  let width = 0;

  if (currentValue > maxValue) width = 100;

  if (currentValue < maxValue && currentValue > minValue) {
    width = (currentValue * 100) / maxValue;
  }

  return (
    <div className={styles.tierBar}>
      <div className={styles.completition} style={{ width: `${width}%` }} />
    </div>
  );
};

export default DiscountProgressBarTier;
