import {Router} from 'express';
import { validate } from 'uuid';
import { Request, Response } from 'express';
import authMiddleware from './middlewares/auth_middleware';
import { CreateUserController } from './controllers/CreateUserController';
const routes = Router();

//public routes;
routes.get('/', (req,res) => {
    return res.json("public route");
});
routes.post('/register', new CreateUserController().handle)

//protected routes;
routes.use(authMiddleware);
routes.get('/validate',(req: Request,res: Response) => res.json("protected route"));

export default routes;