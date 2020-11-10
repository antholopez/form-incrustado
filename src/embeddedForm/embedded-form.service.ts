import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmbeddedFormService {

  async getTestForm(): Promise<any> {
    try {
      
      const token = this.encoded();
      // console.log('Viendo el token que se ha creado: ', token);
      
      const url =
        'https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment';
      const headers = {
        Authorization: `Basic ${token}`,
      };
      let paymentData = {
        amount: 9400,
        currency: 'PEN',
        orderId: 'myOrderABC780',
        customer: {
          email: 'sample@example.com',
        },
      };

      const { data } = await axios.post(url, paymentData, { headers });
  
      return data;

      // izipay-test.herokuapp.com/embedded-form/payment-response-url
      
    } catch (error) {
      console.log('Viendo el error: ', error)
    }
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
    let user = '60203431';
    let pass = 'testpassword_4GVdJk52pmo1sleHRfT0f2wVnjUJJi9lw9EmtrAy6lkLB';
    let text = user + ':' + pass;
    return Buffer.from(text).toString('base64')
  }
}