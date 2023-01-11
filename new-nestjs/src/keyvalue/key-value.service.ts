import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateKeyValueDto, UpdateKeyValueDto } from "@/keyvalue/dto";

@Injectable()
export class KeyValueService {
  constructor(private prisma: PrismaService) {}

  async getKeyValues(userId: number) {
    return this.prisma.keyValue.findMany({
      where: {
        userId,
      },
    });
  }

  async getKeyValue(userId: number, key: string) {
    const entity = await this.prisma.keyValue.findUnique({
      where: {
        user_key: {
          userId: userId,
          key: key,
        },
      },
    });

    if (!entity) {
      throw new NotFoundException("Key is not found");
    }
    return entity;
  }

  async createKeyValue(userId: number, dto: CreateKeyValueDto) {
    return this.prisma.keyValue.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async updateKeyValue(userId: number, key: string, dto: UpdateKeyValueDto) {
    return this.prisma.keyValue.update({
      where: {
        user_key: {
          userId: userId,
          key: key,
        },
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteKeyValue(userId: number, key: string) {
    return this.prisma.keyValue.delete({
      where: {
        user_key: {
          userId: userId,
          key: key,
        },
      },
    });
  }
}
