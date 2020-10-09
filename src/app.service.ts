import { Injectable } from '@nestjs/common';
import { log } from 'console';
// import axios from 'axios';
import * as moment from "moment";
import * as crypto from "crypto";
import { measureMemory } from 'vm';

@Injectable()
export class AppService {
  // async getTestForm(): Promise<any> {
  //   const token = this.encoded();

  //   const url =
  //     'https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment';
  //   const headers = {
  //     Authorization: `Basic ${token}`,
  //   };
  //   let paymentData = {
  //     amount: 100,
  //     currency: 'PEN',
  //     orderId: 'myOrderIdABC',
  //     customer: {
  //       email: 'sample@example.com',
  //     },
  //   };
  //   const { data } = await axios.post(url, paymentData, { headers });

  //   return data;
  // }

  async formPago() {
    return this.generateFormPaymentData();
  }
  
  private generateFormPaymentData() {
    const key = 'kAJ7GG78CXbynMfq';
    let data = this.requestPayment();
    
    let message = '';

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        message += element + "+"
      }
    }
    message += key;
    
    // generate signature
    const hash = crypto.createHmac('sha256', key).update(message).digest('base64');
    data.signature = hash;

    return data
  }
  
  private requestPayment(): any {
    return {
      actionMode: 'INTERACTIVE',
      amount: '3800',
      ctxMode: 'TEST',
      currency: '604',
      pageAction: 'PAYMENT',
      paymentConfig: 'SINGLE',
      siteId: '60203431',
      transDate: this.getDate(),
      transId: this.getRandomTransactionId(100000, 199999),
      version: 'V2'
    }
  }

  private getDate() {
    return moment().add(5, 'hours').format('YYYYMMDDHHmmss');
  }

  private getRandomTransactionId(min: number, max: number) {
    let randomNum = Math.random() * (max - min) + min;
    return String(Math.round(randomNum));
  }


  // async restFormIncrustado() {
  //   const token = this.encoded();

  //   const url =
  //     'https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment';
  //   const headers = {
  //     Authorization: `Basic ${token}`,
  //   };
  //   let paymentData = {
  //     amount: 180,
  //     currency: 'PEN',
  //     paymentForms: [
  //       {
  //         paymentMethodType: 'CARD',
  //         pan: '4970100000000014',
  //         expiryMonth: '11',
  //         expiryYear: '21',
  //         securityCode: '123',
  //       },
  //     ],
  //   };

  //   const { data } = await axios.post(url, paymentData, { headers });

  //   return data
  // }

  // private encoded(): string {
  //   let user = '89289758';
  //   let pass = 'testpassword_7vAtvN49E8Ad6e6ihMqIOvOHC6QV5YKmIXgxisMm0V7Eq';
  //   let text = user + ':' + pass;
  //   return Buffer.from(text).toString('base64')
  // }

  // private encoded2(): string {
  //   let text = INTERACTIVE+5124+TEST+604+PAYMENT+SINGLE+60203431+20201008220900+123456+V2+kAJ7GG78CXbynMfq
  //   return Buffer.from(text).toString('base64')
  // }
}


// INTERACTIVE5124TEST604PAYMENTSINGLE6020343120201007130025123456V2kAJ7GG78CXbynMfq