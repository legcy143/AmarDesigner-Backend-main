import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project, ProjectSchema } from './schema/project.schema';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Project.name,
      schema: ProjectSchema
    }
    ]),
    AuthModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, AuthService]
})
export class ProjectsModule { }
