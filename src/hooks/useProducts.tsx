import { createContext, useContext, useEffect, useState } from 'react';
import productsMock from '../data/products.json';
import {
  ILineItem,
  ILineSelectedItem,
  ProductsApiResponseItem,
} from '../types';

interface IProductsContext {
  availableItems: ILineItem[];
  selectedItems: ILineSelectedItem[];
  removeItem: (item: ILineSelectedItem, count?: number) => void;
  addItem: (item: ILineItem) => void;
}

/**
 * Initialize the context with mock values until the provider is created
 */
const productsContext = createContext<IProductsContext>({
  addItem: () => ({}),
  removeItem: () => ({}),
  selectedItems: [],
  availableItems: [],
});

/**
 * Wraps a component inside the Products context
 * @param param0.children The component that'll be wrapped inside the context
 * @returns Component wrapped inside the Products context
 */
export const ProvideProducts = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const products = useProvideProducts();
  return (
    <productsContext.Provider value={products}>
      {children}
    </productsContext.Provider>
  );
};

export const useProducts = (): IProductsContext => {
  return useContext(productsContext);
};

const useProvideProducts = (): IProductsContext => {
  const [selectedItems, setSelectedItems] = useState<ILineSelectedItem[]>([]);
  const [availableItems, setAvailableItems] = useState<ILineItem[]>([]);

  /**
   * When the app loads, fetch the products from the API.
   * If the fetching fails, use the mock as a fallback.
   */
  useEffect(() => {
    const fetchAvailableItems = async () => {
      try {
        const response = await fetch('https://products.free.beeceptor.com/');
        const { products } = (await response.json()) as {
          products: ProductsApiResponseItem[];
        };
        const parsedItems: ILineItem[] = products.map((d) => {
          const [variant] = d.variants;
          return {
            id: d.id,
            image: d.image.src,
            price: +variant.price,
            name: d.title,
            productType: d.product_type,
          };
        });
        setAvailableItems(parsedItems);
      } catch (_) {
        setAvailableItems(productsMock);
      }
    };
    void fetchAvailableItems();
  }, []);

  /**
   * If the item exists in the cart, adds one to it's count.
   * Otherwise, adds the item at the end of the list, with the default value of the count as 1.
   * @param item The item to add to the list
   */
  const addItem = (item: ILineItem) => {
    const newSelectedItems: ILineSelectedItem[] = [...selectedItems];
    const elementIndex = newSelectedItems.findIndex((si) => si.id === item.id);
    if (elementIndex === -1) {
      setSelectedItems([...newSelectedItems, { ...item, count: 1 }]);
    } else {
      newSelectedItems[elementIndex].count++;
      setSelectedItems([...newSelectedItems]);
    }
  };

  /**
   * The default behaviour expects to remove 1 element from the selected item.
   * Extensible to remove the whole item from the cart.
   * @param item The item to remove from it's count
   * @param count The quantity to remove from the specified item. Defaults to 1
   */
  const removeItem = (item: ILineSelectedItem, count = 1) => {
    const newSelectedItems: ILineSelectedItem[] = [...selectedItems];
    const elementIndex = newSelectedItems.findIndex((si) => si.id === item.id);
    if (elementIndex > -1) {
      newSelectedItems[elementIndex].count -= count;
      if (newSelectedItems[elementIndex].count === 0) {
        newSelectedItems.splice(elementIndex, 1);
      }
      setSelectedItems([...newSelectedItems]);
    }
  };

  return {
    availableItems,
    selectedItems,
    addItem,
    removeItem,
  };
};
