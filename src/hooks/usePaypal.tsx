
import { useCartStore } from "../store/cartStore";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;

export function usePaypal() {
    const { cartItems, cartTotal, setPaymentMessage } = useCartStore();

    const createOrder = async () => {
        try {
          const response = await fetch(`${AUTH_BASE_URL}/paypal/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart: Object.entries(cartItems).map(([id, quantity]) => ({id, quantity})),
              cartItems,
              cartTotal
            }),
          });
    
          const orderData = await response.json();

          if (orderData.id) {
            return orderData.id;
          } else {
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
              : JSON.stringify(orderData);
    
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error(error);
          setPaymentMessage(`Could not initiate PayPal Checkout...${error}`);
        }
      }
    
    const onApprove = async (data: { orderID: any; }, actions: { restart: () => any; }) => {
        try {
          const response = await fetch(
            `${AUTH_BASE_URL}/paypal/orders/${data.orderID}/capture`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          const orderData = await response.json();
          // Three cases to handle:
          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //   (2) Other non-recoverable errors -> Show a failure message
          //   (3) Successful transaction -> Show confirmation or thank you message

          const errorDetail = orderData?.details?.[0];

          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
          } else if (errorDetail) {
            // (2) Other non-recoverable errors -> Show a failure message
            throw new Error(
              `${errorDetail.description} (${orderData.debug_id})`,
            );
          } else {
            // (3) Successful transaction -> Show confirmation or thank you message
            // Or go to another URL:  actions.redirect('thank_you.html');
            const transaction =
              orderData.purchase_units[0].payments.captures[0];
            setPaymentMessage(
              `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
            );
            console.log(
              "Capture result",
              orderData,
              JSON.stringify(orderData, null, 2),
            );
          }
        } catch (error) {
          console.error(error);
          setPaymentMessage(
            `Sorry, your transaction could not be processed...${error}`,
          );
        }
      }
    
    return {
      createOrder,
      onApprove,
    }
}