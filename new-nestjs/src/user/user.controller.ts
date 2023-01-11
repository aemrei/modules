import { CurrentUser } from "@/auth/decorator/current-user.decorator";
import { JwtGuard } from "@/auth/guard";
import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { EditUserDto } from "@/user/dto";
import { UserService } from "@/user/user.service";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Put("me")
  async updateMe(@CurrentUser("id") userId: number, @Body() editUserDto: EditUserDto) {
    return this.userService.updateUser(userId, editUserDto);
  }
}
