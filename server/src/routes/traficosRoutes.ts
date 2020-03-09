import { Router } from 'express';
import traficosController from '../controllers/traficosController';

class TraficosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', traficosController.list);
        this.router.get('/:id', traficosController.getOne);
        this.router.put('/', traficosController.create);
        this.router.put('/:id', traficosController.update);
        this.router.delete('/:id', traficosController.delete);
        this.router.post('/', traficosController.prueba)

    }

}

const traficosRoutes = new TraficosRoutes();
export default traficosRoutes.router;