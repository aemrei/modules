import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { KeyValueService } from "@/keyvalue/key-value.service";
import { CurrentUser } from "@/auth/decorator";
import { JwtGuard } from "@/auth/guard";
import { CreateKeyValueDto, UpdateKeyValueDto } from "@/keyvalue/dto";

@UseGuards(JwtGuard)
@Controller("keyValues")
export class KeyValueController {
  constructor(private keyValueService: KeyValueService) {}

  @Get()
  async getKeyValues(@CurrentUser("id") userId: number) {
    return this.keyValueService.getKeyValues(userId);
  }

  @Get(":key")
  async getKeyValue(@CurrentUser("id") userId: number, @Param("key") key: string) {
    return this.keyValueService.getKeyValue(userId, key);
  }

  @Post()
  async createKeyValue(@CurrentUser("id") userId: number, @Body() dto: CreateKeyValueDto) {
    return this.keyValueService.createKeyValue(userId, dto);
  }

  @Put(":key")
  async updateKeyValue(
    @CurrentUser("id") userId: number,
    @Param("key") key: string,
    @Body() dto: UpdateKeyValueDto,
  ) {
    return this.keyValueService.updateKeyValue(userId, key, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":key")
  async deleteKeyValue(@CurrentUser("id") userId: number, @Param("key") key: string) {
    return this.keyValueService.deleteKeyValue(userId, key);
  }
}
