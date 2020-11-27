import { Injectable } from '@nestjs/common';
import * as moment from "moment";
import * as crypto from "crypto";

@Injectable()
export class PaymentFormService {

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
    console.log(message)
    
    // generate signature
    const hash = crypto.createHmac('sha256', key).update(message).digest('base64');
    data.signature = hash;

    console.log('payment data: ', data);
    

    return data
  }
  
  private requestPayment(): any {
    return {
      actionMode: 'INTERACTIVE',
      amount: '2000',
      ctxMode: 'TEST',
      currency: '604',
      custEmail: 'alopez@gmail.com',
      // identifier: '294ce17892ae46b09db4e219ab190e89',
      pageAction: 'PAYMENT', // PAYMENT; REGISTER
      paymentConfig: 'SINGLE',
      siteId: '60203431',
      transDate: this.getDate(),
      transId: this.getRandomTransactionId(100000, 199999),
      version: 'V2'
    }
  }

  private getDate() {
    if (process.env.NODE_ENV === 'production') return moment().format('YYYYMMDDHHmmss');
    return moment().add(5, 'hours').format('YYYYMMDDHHmmss');
  }

  private getRandomTransactionId(min: number, max: number) {
    let randomNum = Math.random() * (max - min) + min;
    return String(Math.round(randomNum));
  }
}

// TOKEN
// aceb26d84ef246ba8c83a8cd95c54ab1