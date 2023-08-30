import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".local.env"],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => {
        return ({
          uri: ConfigService.get<string>('MONGO_URI'),
        })
      },
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: 'AmarDesigner',
      signOptions: { expiresIn: '30d' },
    })    ,
    AuthModule,
    ProjectsModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
