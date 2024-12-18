import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ImageKitModule } from 'imagekit-nestjs';
import { join } from 'path';
import { ImageKitConfig } from './config/imagekit.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { memoryStorage } from 'multer';
import { DatabaseModule } from './database/database.module';
import { HeaderModule } from './header/header.module';
import { CoursesModule } from './courses/courses.module';
import { ContentModule } from './content/content.module';
import { SkillsAndToolsModule } from './skills-and-tools/skills-and-tools.module';
import { MentorModule } from './mentor/mentor.module';
import { CourseModulesModule } from './course-modules/course-modules.module';

const DEFAULT_ADMIN = {
  email: 'admin',
  password: 'admin',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/files',
    }),
    MulterModule.register({
      storage: memoryStorage(),
    }),
    ConfigModule.forRoot(),
    ImageKitModule.forRootAsync({
      useFactory: ImageKitConfig,
      inject: [ConfigService],
      imports: [ConfigModule],
      isGlobal: true,
    }),
    // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [],
          },
          auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: 'secret',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        }),
      }),
    ),
    UploadModule,
    DatabaseModule,
    HeaderModule,
    CoursesModule,
    ContentModule,
    SkillsAndToolsModule,
    MentorModule,
    // CourseModulesModule,
  ],
})
export class AppModule {}
