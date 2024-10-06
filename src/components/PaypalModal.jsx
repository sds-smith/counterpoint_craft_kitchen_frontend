
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useCartStore } from '../store/cartStore';
import { Typography } from '@mui/material';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
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
  const navigate = useNavigate();
  const { paymentMessage, clearPaymentMessage, clearCart, toggleCartIsOpen, method } = useCartStore();

  const message = {
    pickup: "Your order will be ready for pickup in 20 minutes.",
    delivery: "We will have your order out to you as soon as possible"
  }

  const handleClose = () => {
    clearPaymentMessage();
    clearCart();
    toggleCartIsOpen();
    navigate('/');
  }

  return (
    <div >
      <Modal
        open={paymentMessage.startsWith('Transaction')}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant='h5' textAlign={'center'}>Thank you for your Order</Typography>
          <Typography variant='body1' textAlign={'center'}>{message[method]}</Typography>
          <Button variant='contained' sx={{width: '80%', margin: '20px auto'}} onClick={handleClose} >Return Home</Button>
          <Typography variant='body2' textAlign={'center'} sx={{mt: 4}}>{paymentMessage}</Typography>
        </Box>
      </Modal>
    </div>
  );
}