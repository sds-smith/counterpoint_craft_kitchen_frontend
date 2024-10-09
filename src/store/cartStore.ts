import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export interface CartState {
  method: string | null,
  cartItems: {},
  cartCount: number,
  cartTotal: string,
  cartIsOpen: boolean | undefined,
  paymentMessage: string,

  updateMethod: (newMethod: string) => void,
  addItemToCart: (itemId: string, quantity: number, price: string) => void,
  removeItemFromCart: (itemId: string, quantity: number, price: string) => void,
  editItemQuantity: (itemId: string, quantity: number, price: string) => void,
  clearCart: () => void,
  toggleCartIsOpen: () => void,
  setPaymentMessage: (msg: string) => void,
  clearPaymentMessage: () => void,
  
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      method: null,
      cartItems: {},
      cartCount: 0,
      cartTotal: '0',
      cartIsOpen: false,
      paymentMessage: "",
      
      updateMethod: (newMethod) => set({ method: newMethod }),
      addItemToCart: (itemId, quantity, price) => {
        const starting = get();
        set({ 
          cartItems: { 
            ...starting.cartItems, 
            [itemId]: (starting.cartItems[itemId as keyof typeof starting.cartItems] || 0) + quantity
          },
          cartCount: starting.cartCount + quantity,
          cartTotal: (parseFloat(starting.cartTotal) + (quantity * parseFloat(price))).toFixed(2)
        });
      },
      removeItemFromCart: (itemId, quantity, price) => {
        const starting = get();
        const cart = starting.cartItems;
        delete cart[itemId as keyof typeof starting.cartItems];
        set({
          cartItems: cart,
          cartCount: starting.cartCount - quantity,
          cartTotal: (parseFloat(starting.cartTotal) - (quantity * parseFloat(price))).toFixed(2)
        })
      },
      editItemQuantity: (itemId, quantity, price) => {
        const starting = get();
        const originalItemQty = starting.cartItems[itemId as keyof typeof starting.cartItems]
        const originalItemSubtotal = originalItemQty * parseFloat(price)
        set({ 
          cartItems: { 
            ...starting.cartItems, 
            [itemId]: quantity
          },
          cartCount: starting.cartCount - originalItemQty + quantity,
          cartTotal: (parseFloat(starting.cartTotal) - originalItemSubtotal + (quantity * parseFloat(price))).toFixed(2)
        });
      },
      clearCart: () => {
        set({
          cartItems: {},
          cartCount: 0,
          cartTotal: "0",
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