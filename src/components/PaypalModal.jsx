
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useCartStore } from '../store/cartStore';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { usePaypal } from "../hooks/usePaypal";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PaypalModal() {
  const { paymentModalOpen, handleClosePayment } = useCartStore();
  const { createOrder, onApprove, message } = usePaypal();

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    "enable-funding": "venmo",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  return (
    <div >
      <Modal
        open={paymentModalOpen}
        onClose={handleClosePayment}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                style={{
                  shape: "rect",
                   /*color:'blue', /*change the default color of the buttons*/
                  layout: "vertical", //default value. Can be changed to horizontal
                }}
                createOrder={createOrder}
                onApprove={onApprove}
              />
            </PayPalScriptProvider>
            <Message content={message} />
        </Box>
      </Modal>
    </div>
  );
}