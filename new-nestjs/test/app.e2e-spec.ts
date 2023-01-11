import { Test } from "@nestjs/testing";
import * as pactum from "pactum";
import { AppModule } from "@/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { AuthDto } from "@/auth/dto";
import { CreateKeyValueDto, UpdateKeyValueDto } from "@/keyvalue/dto";

describe("App e2e", () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(4445);
    prisma = app.get(PrismaService);

    await prisma.cleanDb();

    pactum.request.setBaseUrl("http://localhost:4445");
    const { settings } = pactum;
    settings.setLogLevel("ERROR");
  });

  afterAll(async () => {
    await app.close();
  });

  const auth: AuthDto = {
    email: "user1@email.com",
    password: "password",
  };

  describe("Auth", () => {
    describe("Sign up", () => {
      it("should sign up a user", async () => {
        await pactum.spec().post("/auth/signup").withJson(auth).expectStatus(201);
      });

      it("should not sign up a user with an existing email", async () => {
        await pactum.spec().post("/auth/signup").withJson(auth).expectStatus(409);
      });

      it("should not sign up a user with an invalid email", async () => {
        await pactum
          .spec()
          .post("/auth/signup")
          .withJson({ ...auth, email: "invalid-email" })
          .expectStatus(400);
      });
    });

    describe("Login", () => {
      it("should login a user", async () => {
        await pactum
          .spec()
          .post("/auth/login")
          .withJson(auth)
          .expectStatus(200)
          .stores("token", "access_token");
      });
    });

    describe("Logout", () => {
      it("should logout a user", async () => {
        await pactum
          .spec()
          .post("/auth/logout")
          .withHeaders("Authorization", "Bearer {{token}}")
          .expectStatus(200);

        await pactum
          .spec()
          .get("/auth/me")
          .withHeaders("Authorization", "Bearer {{token}}")
          .expectStatus(401);
      });
    });
  });

  describe("User", () => {
    describe("Get me", () => {
      it("should get the current user", async () => {
        await pactum
          .spec()
          .get("/users/me")
          .withHeaders("Authorization", "Bearer $S{token}")
          .expectStatus(200)
          .stores("user", "user")
          .expectBodyContains(auth.email);
      });
    });
    describe("Update me", () => {
      it("should update the current user", async () => {
        await pactum
          .spec()
          .put("/users/me")
          .withHeaders("Authorization", "Bearer $S{token}")
          .withJson({ name: "Updated name" })
          .expectStatus(200)
          .expectBodyContains("Updated name");

        await pactum
          .spec()
          .get("/users/me")
          .withHeaders("Authorization", "Bearer $S{token}")
          .expectStatus(200)
          .expectBodyContains("Updated name");
      });
    });
  });

  describe("KeyValues", () => {
    const sample: CreateKeyValueDto = {
      key: "key1",
      value: "value1",
    };

    describe("Get empty", () => {
      it("should get an empty list", async () => {
        await pactum
          .spec()
          .get("/keyValues")
          .withHeaders("Authorization", "Bearer $S{token}")
          .expectStatus(200)
          .expectBodyContains("[]");
      });
    });

    describe("Create", () => {
      it("should create a key value", async () => {
        await pactum
          .spec()
          .post("/keyValues")
          .withHeaders("Authorization", "Bearer $S{token}")
          .withJson(sample)
          .expectStatus(201)
          .expectBodyContains(sample.key)
          .expectBodyContains(sample.value)
          .stores("keyValueId", "id");

        await pactum
          .spec()
          .get("/keyValues")
          .withHeaders("Authorization", "Bearer $S{token}")
          .expectStatus(200)
          .expectBodyContains(sample.key)
          .expectBodyContains(sample.value)
          .expectBodyContains("$S{keyValueId}")
          .expectJsonLength(1);
      });
    });

    describe("Update", () => {
      it("should update a key value", async () => {
        const dto: UpdateKeyValueDto = {
          value: "value2",
        };

        await pactum
          .spec()
          .put(`/keyValues/${sample.key}`)
          .withHeaders("Authorization", "Bearer $S{token}")
          .withJson(dto)
          .expectStatus(200)
          .expectBodyContains(sample.key)
          .expectBodyContains(dto.value)
          .expectBodyContains("$S{keyValueId}");

        await pactum
          .spec()
          .get(`/keyValues/${sample.key}`)
          .withHeaders("Authorization", "Bearer $S{token}")
          .expectStatus(200)
          .expectBodyContains(dto.value);
      });
    });

    describe("Delete", () => {
      it("should delete a key value", async () => {
        await pactum
          .spec()
          .delete(`/keyValues/${sample.key}`)
          .withHeaders("Authorization", "Bearer $S{token}")
          .expectStatus(204);

        await pactum
          .spec()
          .get(`/keyValues/${sample.key}`)
          .withHeaders("Authorization", "Bearer $S{token}")
          .expectStatus(404)
          .inspect();

        await pactum
          .spec()
          .get("/keyValues")
          .withHeaders("Authorization", "Bearer $S{token}")
          .expectStatus(200)
          .expectBodyContains("[]");
      });
    });
  });
});
