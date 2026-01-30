import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CheckLinkModule } from "./check-link/check-link.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    CheckLinkModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === "development",
      logging: process.env.NODE_ENV === "development",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
