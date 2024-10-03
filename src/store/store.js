import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      method: null,
      updateMethod: (newMethod) => set({ method: newMethod }),
      cartItems: {},
      cartCount: 0,
      cartTotal: 0,
      addItemToCart: (itemId, quantity, price) => {
        set({ 
          cartItems: { 
            ...get().cartItems, 
            [itemId]: (get().cartItems[itemId] || 0) + quantity
          }
        });
        set({ cartCount: get().cartCount + quantity })
        set({ cartTotal: get().cartTotal + (quantity * price) })
      },
      cartIsOpen: false,
      toggleCartIsOpen: () => set({ cartIsOpen: !get().cartIsOpen})
    }),
    {
      name: 'cart-storage', 
    },
  ),
)