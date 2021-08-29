import { FC } from 'react';
import { useProducts } from '../../hooks/useProducts';
import styles from './quantity-selector.module.scss';

interface QuantitySelectorProps {
  itemId: number;
  price: number;
  currentCount: number;
}

const QuantitySelector: FC<QuantitySelectorProps> = ({
  itemId,
  currentCount,
  price,
}) => {
  const { removeItem, addItemCount } = useProducts();

  const increaseCount = () => {
    addItemCount(itemId);
  };

  const decreaseCount = () => {
    removeItem(itemId);
  };

  return (
    <div className={styles.quantitySelector}>
      <div className={styles.handle}>
        <button
          className={styles.buttonHandle}
          type="button"
          onClick={decreaseCount}
        >
          <img src="/img/minus.svg" alt="Remove 1 item" />
        </button>
        <span>{currentCount}</span>
        <button
          className={styles.buttonHandle}
          type="button"
          onClick={increaseCount}
        >
          <img src="/img/plus.svg" alt="Add 1 item" />
        </button>
      </div>
      <span className={styles.subtotal}>{`$${(price * currentCount).toFixed(
        2
      )}`}</span>
    </div>
  );
};

export default QuantitySelector;
