import { Router } from 'express';

import classesRoutes from './classes.routes';
import connectionsRoutes from './connections.routes';

const routes = Router();

routes.use(classesRoutes);
routes.use(connectionsRoutes);

export default routes;
