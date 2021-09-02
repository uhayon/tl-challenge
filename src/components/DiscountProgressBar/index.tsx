import { FC } from 'react';
import { DISCOUNT_CONFIG } from '../../constants/discounts';
import { useDiscounts } from '../../hooks/useDiscounts';
import { useProducts } from '../../hooks/useProducts';
import styles from './discount-progress-bar.module.scss';
import DiscountProgressBarTier from './DiscountProgressBarTier';

const DiscountProcessBar: FC = () => {
  const { nextTier } = useDiscounts();
  const { selectedItems } = useProducts();
  const subTotal = selectedItems.reduce(
    (total, { count, price }) => total + count * price,
    0
  );

  const getPreviousTier = (baseTier: number): number => {
    return (
      Object.keys(DISCOUNT_CONFIG)
        .map((d) => +d)
        .sort((a, b) => b - a)
        .find((d) => d < baseTier) || 0
    );
  };

  return (
    <div className={styles.discountProgressBar}>
      <h3 className={styles.title}>BUILD YOUR KIT & SAVE</h3>
      {nextTier && (
        <p
          className={styles.nextTier}
        >{`Spend $${nextTier?.basePrice}, Save $${nextTier.discount}`}</p>
      )}
      <div className={styles.tierBarsContainer}>
        {Object.keys(DISCOUNT_CONFIG).map((dc) => {
          const tierBasePrice = +dc;

          const previous = getPreviousTier(tierBasePrice);

          return (
            <DiscountProgressBarTier
              minValue={previous}
              maxValue={tierBasePrice}
              currentValue={subTotal}
              key={tierBasePrice}
            />
          );
        })}
      </div>
      <div className={styles.tierDiscountContainer}>
        {Object.keys(DISCOUNT_CONFIG).map((dc) => (
          <span key={dc} className={styles.tierDiscount}>
            {`$${DISCOUNT_CONFIG[+dc]} OFF`}
          </span>
        ))}
      </div>
    </div>
  );
};

export default DiscountProcessBar;
