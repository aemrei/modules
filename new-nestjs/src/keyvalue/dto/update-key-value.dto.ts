import { PartialType } from "@nestjs/mapped-types";
import { CreateKeyValueDto } from "@/keyvalue/dto/create-key-value.dto";

export class UpdateKeyValueDto extends PartialType(CreateKeyValueDto) {}
