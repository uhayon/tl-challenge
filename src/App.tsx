import './App.css';
import Cart from './components/Cart';
import { ProvideDiscounts } from './hooks/useDiscounts';
import { ProvideProducts } from './hooks/useProducts';

function App(): JSX.Element {
  return (
    <ProvideProducts>
      <div className="App">
        <ProvideDiscounts>
          <Cart />
        </ProvideDiscounts>
      </div>
    </ProvideProducts>
  );
}

export default App;
