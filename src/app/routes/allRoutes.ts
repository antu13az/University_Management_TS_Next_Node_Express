import { Router } from 'express';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { UserRoute } from '../modules/users/user.route';

const routes = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoute,
  },
];

modulesRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
