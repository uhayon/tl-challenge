import { FC } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ILineItem } from '../../types';
import DiscountProgressBar from '../DiscountProgressBar';
import ProductCard from '../ProductCard';
import styles from './cart.module.scss';

const Cart: FC = () => {
  const { selectedItems, addItem, availableItems } = useProducts();

  const addProduct = (product: ILineItem) => () => {
    addItem(product);
  };

  return (
    <div className={styles.cart}>
      <div className={styles.itemsContainer}>
        <DiscountProgressBar />
        {selectedItems.map((sp) => (
          <ProductCard product={sp} key={sp.id} />
        ))}
      </div>
      <div className="App-button-section">
        {availableItems.map((ai) => (
          <button
            onClick={addProduct(ai)}
            key={ai.id}
            className="button-add-item"
          >{`Add ${ai.name} ${ai.id}`}</button>
        ))}
      </div>
    </div>
  );
};

export default Cart;
