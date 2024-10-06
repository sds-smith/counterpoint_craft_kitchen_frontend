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
        const starting = get();
        set({ 
          cartItems: { 
            ...starting.cartItems, 
            [itemId]: (starting.cartItems[itemId] || 0) + quantity
          },
          cartCount: starting.cartCount + quantity,
          cartTotal: (parseFloat(starting.cartTotal) + (quantity * price)).toFixed(2)
        });
      },
      removeItemFromCart: (itemId, quantity, price) => {
        const starting = get();
        const cart = starting.cartItems;
        delete cart[itemId];
        set({
          cartItems: cart,
          cartCount: starting.cartCount - quantity,
          cartTotal: (parseFloat(starting.cartTotal) - (quantity * price)).toFixed(2)
        })
      },
      editItemQuantity: (itemId, quantity, price) => {
        const starting = get();
        const originalItemQty = starting.cartItems[itemId]
        const originalItemSubtotal = originalItemQty * price
        set({ 
          cartItems: { 
            ...starting.cartItems, 
            [itemId]: quantity
          },
          cartCount: starting.cartCount - originalItemQty + quantity,
          cartTotal: (parseFloat(starting.cartTotal) - originalItemSubtotal + (quantity * price)).toFixed(2)
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