import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmbeddedFormService {

  async getTestForm(): Promise<any> {
    const token = this.encoded();

    const url =
      'https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment';
    const headers = {
      Authorization: `Basic ${token}`,
    };
    let paymentData = {
      amount: 100,
      currency: 'PEN',
      orderId: 'myOrderIdABC',
      customer: {
        email: 'sample@example.com',
      },
    };
    const { data } = await axios.post(url, paymentData, { headers });

    return data;
  }

  async restFormIncrustado() {
    const token = this.encoded();

    const url =
      'https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment';
    const headers = {
      Authorization: `Basic ${token}`,
    };
    let paymentData = {
      amount: 180,
      currency: 'PEN',
      paymentForms: [
        {
          paymentMethodType: 'CARD',
          pan: '4970100000000014',
          expiryMonth: '11',
          expiryYear: '21',
          securityCode: '123',
        },
      ],
    };

    const { data } = await axios.post(url, paymentData, { headers });

    return data
  }

  private encoded(): string {
    let user = '89289758';
    let pass = 'testpassword_7vAtvN49E8Ad6e6ihMqIOvOHC6QV5YKmIXgxisMm0V7Eq';
    let text = user + ':' + pass;
    return Buffer.from(text).toString('base64')
  }
}