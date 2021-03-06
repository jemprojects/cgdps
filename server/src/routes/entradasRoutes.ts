import { Router } from 'express';
import entradasController from '../controllers/entradasController';

class EntradasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', entradasController.list);
        this.router.get('/:id', entradasController.getOne);
        this.router.put('/', entradasController.create);
        this.router.put('/:id', entradasController.update);
        this.router.delete('/:id', entradasController.delete);

    }

}

const entradasRoutes = new EntradasRoutes();
export default entradasRoutes.router;