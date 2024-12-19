import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tools, ToolsSchema } from '../tools/entities/tool.entity';
import { Skills, SkillsSchema } from '../skills/entities/skill.entity';
import { Course, CourseSchema } from '../courses/entities/courses.entity';
import { Mentor, MentorSchema } from '../mentor/entities/mentor.entity';

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
    MongooseModule.forFeature([
      { name: Tools.name, schema: ToolsSchema },
      { name: Skills.name, schema: SkillsSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Mentor.name, schema: MentorSchema },
    ]),
  ],
})
export class AdminPanelModule {
  static async forRoot(): Promise<DynamicModule> {
    const { AdminModule: AdminJSModule } = await import('@adminjs/nestjs');
    const AdminJS = (await import('adminjs')).default;
    const AdminJSMongoose = await import('@adminjs/mongoose');

    AdminJS.registerAdapter(AdminJSMongoose);

    return {
      module: AdminPanelModule,
      imports: [
        AdminJSModule.createAdminAsync({
          useFactory: () => ({
            adminJsOptions: {
              rootPath: '/admin',
              resources: [
                {
                  resource: Tools,
                  options: { navigation: { name: 'Tools', icon: 'Wrench' } },
                },
                {
                  resource: Skills,
                  options: { navigation: { name: 'Skills', icon: 'Brain' } },
                },
                {
                  resource: Course,
                  options: { navigation: { name: 'Courses', icon: 'Book' } },
                },
                {
                  resource: Mentor,
                  options: { navigation: { name: 'Mentors', icon: 'User' } },
                },
              ],
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
      ],
    };
  }
}
