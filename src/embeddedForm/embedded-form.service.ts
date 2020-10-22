import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmbeddedFormService {

  async getTestForm(): Promise<any> {
    try {
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
        // formAction : "SILENT",
        // paymentMethodToken:"fab9213065974b3ab03df26dfad92979",
        customer: {
          email: 'sample@example.com',
        },
      };
      const { data } = await axios.post(url, paymentData, { headers });
  
      return data;
      
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