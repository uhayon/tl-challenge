import { FC } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ILineSelectedItem } from '../../types';
import QuantitySelector from '../QuantitySelector';
import styles from './product-card.module.scss';

interface Props {
  product: ILineSelectedItem;
}

const ProductCard: FC<Props> = ({ product }) => {
  const { removeItem } = useProducts();
  const deleteItem = () => {
    removeItem(product.id, product.count);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        <img
          className={styles.productImage}
          src={product.image}
          alt={Image.name}
        />
      </div>
      <div className={styles.productDescription}>
        <div className={styles.productName}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.variant}>{product.variant}</p>
        </div>
      </div>
      <QuantitySelector
        itemId={product.id}
        currentCount={product.count}
        price={product.price}
      />
      <button type="button" className={styles.btnClose} onClick={deleteItem}>
        <img src="/img/delete.svg" alt={`Remove ${product.name}`} />
      </button>
    </div>
  );
};

export default ProductCard;
