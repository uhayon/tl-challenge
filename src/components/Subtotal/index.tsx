import { FC } from 'react';
import { useDiscounts } from '../../hooks/useDiscounts';
import { useProducts } from '../../hooks/useProducts';
import styles from './subtotal.module.scss';

const Subtotal: FC = () => {
  const { selectedItems } = useProducts();
  const { currentTier } = useDiscounts();
  const subtotal = selectedItems.reduce(
    (total, { price, count }) => total + price * count,
    0
  );

  return (
    <div className={styles.subtotal}>
      <div className={styles.categoryContainer}>
        <span className={styles.label}>Build Your Kit Subtotal</span>
        <span className={styles.value}>{`$${subtotal}`}</span>
      </div>
      {currentTier && (
        <div className={styles.categoryContainer}>
          <div>
            <span className={styles.label}>Discount</span>
            <span
              className={styles.tierDescription}
            >{`(Spend $${currentTier.basePrice}, Save $${currentTier.discount})`}</span>
          </div>
          <span
            className={`${styles.value} ${styles.discount}`}
          >{`-$${currentTier.discount}`}</span>
        </div>
      )}
    </div>
  );
};

export default Subtotal;
