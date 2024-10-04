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
          },
          cartCount: get().cartCount + quantity,
          cartTotal: get().cartTotal + (quantity * price)
        });
      },
      removeItemFromCart: (itemId, quantity, price) => {
        const cart = get().cartItems;
        delete cart[itemId];
        set({
          cartItems: cart,
          cartCount: get().cartCount - quantity,
          cartTotal: get().cartTotal - (quantity * price)
        })
      },
      editItemQuantity: (itemId, quantity, price) => {
        const originalItemQty = get().cartItems[itemId]
        const originalItemSubtotal = originalItemQty * price
        set({ 
          cartItems: { 
            ...get().cartItems, 
            [itemId]: quantity
          },
          cartCount: get().cartCount - originalItemQty + quantity,
          cartTotal: get().cartTotal - originalItemSubtotal + (quantity * price)
        });
      },
      clearCart: () => {
        set({
          cartItems: {},
          cartCount: 0,
          cartTotal: 0,
          method: null
        })
      },
      cartIsOpen: false,
      toggleCartIsOpen: () => set({ cartIsOpen: !get().cartIsOpen})
    }),
    {
      name: 'cart-storage', 
    },
  ),
)