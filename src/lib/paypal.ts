// PayPal Payment Service
const PAYPAL_CLIENT_ID = 'Dnn2Oz65uT3mQ4-bq-1dCKb-TuCo';
const PAYPAL_CLIENT_SECRET = 'EPkXlq469LnbGg3vprtQUgCH5spVs6ephJcPx_p_NfCquvceuswgKvleWhI5cKP5Xo6Aey4oslqyYayH';
const PAYPAL_BASE_URL = 'https://api-m.paypal.com'; // Live environment

export interface PayPalPaymentRequest {
  amount: number;
  currency: string;
  description: string;
  orderId?: string;
  userId?: string;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface PayPalPaymentResponse {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export interface PayPalOrderDetails {
  id: string;
  status: string;
  amount: {
    currency_code: string;
    value: string;
  };
  payer: {
    email_address: string;
    name: {
      given_name: string;
      surname: string;
    };
  };
  create_time: string;
  update_time: string;
}

export class PayPalService {
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.clientId = PAYPAL_CLIENT_ID;
    this.clientSecret = PAYPAL_CLIENT_SECRET;
    this.baseUrl = PAYPAL_BASE_URL;
  }

  private async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const auth = btoa(`${this.clientId}:${this.clientSecret}`);
      
      const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        throw new Error(`PayPal auth error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Subtract 1 minute for safety
      
      return this.accessToken;
    } catch (error) {
      console.error('PayPal authentication error:', error);
      throw error;
    }
  }

  async createOrder(paymentRequest: PayPalPaymentRequest): Promise<PayPalPaymentResponse> {
    try {
      const accessToken = await this.getAccessToken();
      
      const orderData = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: paymentRequest.currency.toUpperCase(),
              value: paymentRequest.amount.toFixed(2),
            },
            description: paymentRequest.description,
            custom_id: paymentRequest.orderId,
          },
        ],
        application_context: {
          return_url: paymentRequest.returnUrl || `${window.location.origin}/payment/success`,
          cancel_url: paymentRequest.cancelUrl || `${window.location.origin}/payment/cancel`,
          brand_name: 'GPO SMART',
          locale: 'ar_SA',
          landing_page: 'BILLING',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'PAY_NOW',
        },
      };

      const response = await fetch(`${this.baseUrl}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'PayPal-Request-Id': `${Date.now()}-${Math.random()}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`PayPal order creation error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('PayPal order creation error:', error);
      throw error;
    }
  }

  async captureOrder(orderId: string): Promise<PayPalOrderDetails> {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(`${this.baseUrl}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'PayPal-Request-Id': `${Date.now()}-${Math.random()}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`PayPal order capture error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('PayPal order capture error:', error);
      throw error;
    }
  }

  async getOrderDetails(orderId: string): Promise<PayPalOrderDetails> {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(`${this.baseUrl}/v2/checkout/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`PayPal order details error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('PayPal order details error:', error);
      throw error;
    }
  }

  async refundPayment(captureId: string, amount?: number, currency?: string): Promise<any> {
    try {
      const accessToken = await this.getAccessToken();
      
      const refundData: any = {};
      if (amount && currency) {
        refundData.amount = {
          value: amount.toFixed(2),
          currency_code: currency.toUpperCase(),
        };
      }

      const response = await fetch(`${this.baseUrl}/v2/payments/captures/${captureId}/refund`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'PayPal-Request-Id': `${Date.now()}-${Math.random()}`,
        },
        body: JSON.stringify(refundData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`PayPal refund error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('PayPal refund error:', error);
      throw error;
    }
  }

  // Client-side PayPal integration helpers
  getPayPalButtonConfig(paymentRequest: PayPalPaymentRequest) {
    return {
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
        height: 40,
      },
      createOrder: async () => {
        const order = await this.createOrder(paymentRequest);
        return order.id;
      },
      onApprove: async (data: any) => {
        try {
          const orderDetails = await this.captureOrder(data.orderID);
          return orderDetails;
        } catch (error) {
          console.error('Payment capture failed:', error);
          throw error;
        }
      },
      onError: (err: any) => {
        console.error('PayPal payment error:', err);
      },
      onCancel: (data: any) => {
        console.log('Payment cancelled:', data);
      },
    };
  }

  // Webhook verification (for server-side use)
  async verifyWebhook(headers: any, body: string, webhookId: string): Promise<boolean> {
    try {
      const accessToken = await this.getAccessToken();
      
      const verificationData = {
        auth_algo: headers['paypal-auth-algo'],
        cert_id: headers['paypal-cert-id'],
        transmission_id: headers['paypal-transmission-id'],
        transmission_sig: headers['paypal-transmission-sig'],
        transmission_time: headers['paypal-transmission-time'],
        webhook_id: webhookId,
        webhook_event: JSON.parse(body),
      };

      const response = await fetch(`${this.baseUrl}/v1/notifications/verify-webhook-signature`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.verification_status === 'SUCCESS';
    } catch (error) {
      console.error('PayPal webhook verification error:', error);
      return false;
    }
  }

  // Utility methods
  getApprovalUrl(paymentResponse: PayPalPaymentResponse): string | null {
    const approvalLink = paymentResponse.links.find(link => link.rel === 'approve');
    return approvalLink ? approvalLink.href : null;
  }

  formatAmount(amount: number): string {
    return amount.toFixed(2);
  }

  validateAmount(amount: number): boolean {
    return amount > 0 && amount <= 10000; // PayPal limits
  }

  getSupportedCurrencies(): string[] {
    return ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'SAR', 'AED'];
  }
}

// Export a singleton instance
export const paypalService = new PayPalService();

// PayPal SDK loader utility
export const loadPayPalSDK = (clientId: string = PAYPAL_CLIENT_ID): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (window.paypal) {
      resolve(window.paypal);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD,SAR,AED&locale=ar_SA`;
    script.async = true;
    
    script.onload = () => {
      if (window.paypal) {
        resolve(window.paypal);
      } else {
        reject(new Error('PayPal SDK failed to load'));
      }
    };
    
    script.onerror = () => {
      reject(new Error('PayPal SDK failed to load'));
    };
    
    document.head.appendChild(script);
  });
};

// Type declarations for PayPal SDK
declare global {
  interface Window {
    paypal: any;
  }
}

