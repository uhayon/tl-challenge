import { createContext, useContext } from 'react';
import { DISCOUNT_CONFIG } from '../constants/discounts';
import { useProducts } from './useProducts';

interface Tier {
  basePrice: number;
  discount: number;
}

interface IDiscountsContext {
  currentTier: null | Tier;
  nextTier: null | Tier;
}

/**
 * Initialize the context with mock values until the provider is created
 */
const discountsContext = createContext<IDiscountsContext>({
  currentTier: null,
  nextTier: null,
});

/**
 * Wraps a component inside the Discounts context
 * @param param0.children The component that'll be wrapped inside the context
 * @returns Component wrapped inside the Discounts context
 */
export const ProvideDiscounts = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const discounts = useProvideDiscounts();
  return (
    <discountsContext.Provider value={discounts}>
      {children}
    </discountsContext.Provider>
  );
};

export const useDiscounts = (): IDiscountsContext => {
  return useContext(discountsContext);
};

const useProvideDiscounts = (): IDiscountsContext => {
  const { selectedItems } = useProducts();
  const subtotal = selectedItems.reduce(
    (total, { count, price }) => total + count * price,
    0
  );

  // Cast keys to numbers
  const tiersBasePrices = Object.keys(DISCOUNT_CONFIG)
    .map((d) => +d)
    .sort();

  const reversedTierBasePrices = [...tiersBasePrices].reverse();

  const getCurrentTier = (): null | Tier => {
    if (subtotal === 0) return null;

    const currentTierKey = reversedTierBasePrices.find((dc) => subtotal > +dc);

    if (!currentTierKey) return null;

    return {
      basePrice: +currentTierKey,
      discount: +DISCOUNT_CONFIG[+currentTierKey],
    };
  };

  const getNextTier = (): null | Tier => {
    // If the subtotal is over the last tier base price, there's no next tier
    const [lastTierBase] = reversedTierBasePrices;

    if (subtotal > lastTierBase) return null;

    // Theres a nextTier, let's check if there's a current tier
    const currentTier = getCurrentTier();

    // If currentTier is null, the next tier if the first one.
    if (!currentTier) {
      const [firstTierBase] = tiersBasePrices;
      return {
        basePrice: firstTierBase,
        discount: DISCOUNT_CONFIG[firstTierBase],
      };
    }

    // Search the nextTier
    const nextTierBasePrice = tiersBasePrices.find((t) => {
      return t > currentTier.basePrice;
    });

    if (!nextTierBasePrice) return null;

    return {
      basePrice: nextTierBasePrice,
      discount: DISCOUNT_CONFIG[nextTierBasePrice],
    };
  };

  return {
    nextTier: getNextTier(),
    currentTier: getCurrentTier(),
  };
};
