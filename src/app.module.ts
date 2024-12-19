import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ImageKitModule } from 'imagekit-nestjs';
import { join } from 'path';
import { ImageKitConfig } from './config/imagekit.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { memoryStorage } from 'multer';
import { DatabaseModule } from './database/database.module';
import { HeaderModule } from './header/header.module';
import { CoursesModule } from './courses/courses.module';
import { ContentModule } from './content/content.module';
import { MentorModule } from './mentor/mentor.module';
import { SkillsModule } from './skills/skills.module';
import { ToolsModule } from './tools/tools.module';
// import { Course } from './courses/entities/courses.entity';
// import { Mentor } from './mentor/entities/mentor.entity';
// import { Skills } from './skills/entities/skill.entity';
// import { Tools } from './tools/entities/tool.entity';
// import { Content } from './content/entities/content.entity';
import { CategoryModule } from './category/category.module';

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

// AdminJS.registerAdapter({
//   Resource: AdminJSMongoose.Resource,
//   Database: AdminJSMongoose.Database,
// });

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
    // import('@adminjs/nestjs').then(({ AdminModule }) =>
    //   AdminModule.createAdminAsync({
    //     useFactory: () => ({
    //       adminJsOptions: {
    //         rootPath: '/admin',
    //         resources: [],
    //       },
    //       auth: {
    //         authenticate,
    //         cookieName: 'adminjs',
    //         cookiePassword: 'secret',
    //       },
    //       sessionOptions: {
    //         resave: true,
    //         saveUninitialized: true,
    //         secret: 'secret',
    //       },
    //     }),
    //   }),
    // ),
    // import('@adminjs/nestjs').then(({ AdminModule }) =>
    //   AdminModule.createAdminAsync({
    //     useFactory: () => ({
    //       adminJsOptions: {
    //         rootPath: '/admin',
    //         resources: [],
    //       },
    //       auth: {
    //         authenticate,
    //         cookieName: 'adminjs',
    //         cookiePassword: 'secret',
    //       },
    //       sessionOptions: {
    //         resave: true,
    //         saveUninitialized: true,
    //         secret: 'secret',
    //       },
    //     }),
    //   }),
    // ),
    DatabaseModule,
    HeaderModule,
    CoursesModule,
    ContentModule,
    MentorModule,
    SkillsModule,
    ToolsModule,
    CategoryModule,
    // CourseModulesModule,
  ],
})
export class AppModule {}
