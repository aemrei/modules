import { ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon2 from "argon2";
import { PrismaService } from "@/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: AuthDto) {
    try {
      const hashedPassword = await argon2.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      const access_token = await this.signJwt(user);

      return {
        user,
        access_token,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Email already exists");
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        hashedPassword: true,
      },
    });

    if (!user) {
      throw new ForbiddenException("Invalid credentials");
    }

    const passwordValid = await argon2.verify(user.hashedPassword, dto.password);

    if (!passwordValid) {
      throw new ForbiddenException("Invalid credentials");
    }

    const access_token = await this.signJwt(user);

    delete user.hashedPassword;

    return {
      user,
      access_token,
    };
  }

  async logout() {
    return true;
  }

  async signJwt(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: "1d",
      secret: this.config.get("JWT_SECRET"),
    });
  }
}
