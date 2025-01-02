import { loadStripe } from '@stripe/stripe-js';

class PaymentService {
  constructor() {
    this.stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
  }

  async createPaymentIntent(amount, currency = 'usd') {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
        }),
      });

      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async processPayment(paymentMethodId, amount) {
    try {
      const stripe = await this.stripePromise;
      const clientSecret = await this.createPaymentIntent(amount);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethodId,
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      return paymentIntent;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }
}