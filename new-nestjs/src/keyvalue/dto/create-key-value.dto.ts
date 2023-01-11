import { IsNotEmpty, IsString } from "class-validator";

export class CreateKeyValueDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  value: string;
}
