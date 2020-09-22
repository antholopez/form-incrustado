import { Injectable } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class AppService {
  async getTestForm(): Promise<any> {
    let user = '89289758';
    let pass = 'testpassword_7vAtvN49E8Ad6e6ihMqIOvOHC6QV5YKmIXgxisMm0V7Eq';

    const token = this.encoded(user, pass);

    const url = 'https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment';
    const headers = {
      Authorization: `Basic ${token}`
    }
    let paymentData = {
      amount:   100,
      currency: "PEN",
      orderId:  "myOrderId-999999",
      customer: {
          email: "sample@example.com"
      }
    }
    const { data } = await axios.post(url, paymentData, { headers })

    return data;
  }

  private encoded(user: string, pass: string): string {
    let text = user + ':' + pass;
    return Buffer.from(text).toString('base64')
  }
}
