import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      method: null,
      cartItems: {},
      cartCount: 0,
      cartTotal: 0,
      cartIsOpen: false,
      paymentMessage: "",
      
      updateMethod: (newMethod) => set({ method: newMethod }),
      addItemToCart: (itemId, quantity, price) => {
        set({ 
          cartItems: { 
            ...get().cartItems, 
            [itemId]: (get().cartItems[itemId] || 0) + quantity
          },
          cartCount: get().cartCount + quantity,
          cartTotal: (get().cartTotal + (quantity * price)).toFixed(2)
        });
      },
      removeItemFromCart: (itemId, quantity, price) => {
        const cart = get().cartItems;
        delete cart[itemId];
        set({
          cartItems: cart,
          cartCount: get().cartCount - quantity,
          cartTotal: (get().cartTotal - (quantity * price)).toFixed(2)
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
          cartTotal: (get().cartTotal - originalItemSubtotal + (quantity * price)).toFixed(2)
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
      toggleCartIsOpen: () => set({ cartIsOpen: !get().cartIsOpen}),
      setPaymentMessage: (msg) => set({ paymentMessage: msg}),
      clearPaymentMessage: () => set({ paymentMessage: ""}),
    }),
    {
      name: 'cart-storage', 
    },
  ),
)