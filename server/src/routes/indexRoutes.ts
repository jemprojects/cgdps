import { Router } from 'express';
import entradasController from '../controllers/entradasController';
import { indexController } from '../controllers/indexController';

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/login', indexController.list);
        this.router.get('/', indexController.index);
        this.router.get('/entradas', entradasController.list);
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;