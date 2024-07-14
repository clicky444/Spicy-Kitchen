import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PAYMENT_URL } from './constants';

// Load the Stripe object
const stripePromise = loadStripe('pk_test_51NjBBsDFWPQTtoetNC5UaKzaPLQrAXuqGxBtXcPaSSNYPUDHYvcNzlnQdB4ZqfAdmkM5DlUCayOQnG7IOq4MU4vr004FzKsM81');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
