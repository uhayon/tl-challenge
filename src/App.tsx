import './App.css';
// import DiscountProcessBar from './components/DiscountProgressBar';
// import products from './data/products.json';
import Cart from './components/Cart';
import { ProvideDiscounts } from './hooks/useDiscounts';
import { ProvideProducts } from './hooks/useProducts';
// import { ILineItem } from './types';

function App(): JSX.Element {
  // const subtotal = lineItems.reduce((reducer, item) => reducer + item.price, 0);
  // // This is the current configuration but could change at any point.
  // // the key is the total and the value is the discount apply
  // const config: DiscountProgressConfig = {
  //   135: 15,
  //   150: 20,
  //   200: 30,
  //   300: 50,
  // };

  // const discountApply = Object.entries(config)
  //   .reverse()
  //   .find(([limit]) => {
  //     return subtotal >= parseInt(limit);
  //   });
  // const total = subtotal - (discountApply ? discountApply[1] : 0);

  // const addProduct = (product: ILineItem) => () => {
  //   console.log(product);
  //   addItem(product);
  // };
  return (
    <ProvideProducts>
      <div className="App">
        {/* <span>Test my component</span> */}
        {/* <DiscountProcessBar total={total} lineItems={lineItems} config={config} /> */}
        {/* <div className="App-total">
        <span>Subtotal:</span>
        <span>{0}</span>
      </div>
      <div className="App-total">
        <span>Total:</span>
        <span>{0}</span>
      </div> */}
        <ProvideDiscounts>
          <Cart />
        </ProvideDiscounts>
      </div>
    </ProvideProducts>
  );
}

export default App;
