import { Module } from "@nestjs/common";
import { PaymentFormController } from "./payment-form.controller";
import { PaymentFormService } from "./payment-form.service";

@Module({
  controllers: [PaymentFormController],
  providers: [PaymentFormService]
})
export class PaymentFormModule {}