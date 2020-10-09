import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentFormModule } from "./paymentForm/payment-form.module";
import { EmbeddedFormModule } from "./embeddedForm/embedded-form.module";

@Module({
  imports: [PaymentFormModule, EmbeddedFormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
