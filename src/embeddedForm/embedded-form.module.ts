import { Module } from "@nestjs/common";
import { EmbeddedFormController } from "./embedded-form.controller";
import { EmbeddedFormService } from "./embedded-form.service";

@Module({
  controllers: [EmbeddedFormController],
  providers: [EmbeddedFormService]
})
export class EmbeddedFormModule {}