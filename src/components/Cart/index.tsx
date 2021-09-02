import { FC } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ILineItem } from '../../types';
import DiscountProgressBar from '../DiscountProgressBar';
import ProductCard from '../ProductCard';
import Spinner from '../Spinner';
import Subtotal from '../Subtotal';
import styles from './cart.module.scss';

const Cart: FC = () => {
  const { selectedItems, addItem, availableItems, fetchingProducts } =
    useProducts();

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
        <Subtotal />
      </div>
      <div className="App-button-section">
        {fetchingProducts ? (
          <Spinner />
        ) : (
          availableItems.map((ai) => (
            <button
              onClick={addProduct(ai)}
              key={ai.id}
              className="button-add-item"
            >{`Add ${ai.name} ${ai.id}`}</button>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
