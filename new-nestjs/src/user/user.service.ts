import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { EditUserDto } from "@/user/dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(userId: number, editUserDto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: editUserDto,
    });

    delete user.hashedPassword;

    return user;
  }
}
