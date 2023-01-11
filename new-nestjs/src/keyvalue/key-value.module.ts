import { Module } from "@nestjs/common";
import { KeyValueController } from "./key-value.controller";
import { KeyValueService } from "./key-value.service";

@Module({
  controllers: [KeyValueController],
  providers: [KeyValueService],
})
export class KeyValueModule {}
