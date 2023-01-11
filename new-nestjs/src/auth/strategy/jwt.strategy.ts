import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CurrentUser } from "@/user/type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly config: ConfigService, private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  async validate(payload: { sub: string; email: string }): Promise<CurrentUser> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    delete user.hashedPassword;

    return { id: user.id, email: payload.email, name: user.name };
  }
}
