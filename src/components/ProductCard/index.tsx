import { FC } from 'react';
import { ILineSelectedItem } from '../../types';
import styles from './product-card.module.scss';

interface Props {
  product: ILineSelectedItem;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img
        className={styles.productImage}
        src={product.image}
        alt={Image.name}
      />
      <div className={styles.productDescription}>
        <h3>{product.name}</h3>
        <p>{`Count: ${product.count}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
