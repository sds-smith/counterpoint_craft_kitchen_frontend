
import Box from '@mui/material/Box';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { usePaypal } from "../hooks/usePaypal";
import { useCartStore } from '../store/cartStore';

const style = {
  width: '80%',
  margin: '0 auto',
  bgcolor: 'background.paper',
  pt: 4,
};

export default function PaypalCheckout() {
  const { createOrder, onApprove } = usePaypal();
  const { paymentMessage } = useCartStore();

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    "enable-funding": "venmo",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  return (
    <Box sx={style}>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical", 
            height: 36
          }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
      <p>{paymentMessage}</p>
    </Box>
  );
}