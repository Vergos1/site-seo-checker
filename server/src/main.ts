import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle("SEO Checker API")
    .setDescription("API for SEO Checker")
    .setVersion("1.0.0")
    .build();

  const document = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("/api/docs", app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const error = errors[0];

        if (!error.constraints) {
          return new BadRequestException("Validation error");
        }

        const message =
          Object.values(error.constraints)[0].charAt(0).toUpperCase() +
          Object.values(error.constraints)[0].slice(1);

        return new BadRequestException(message);
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
