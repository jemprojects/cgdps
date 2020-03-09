import { Router } from 'express';
import agenciasController from '../controllers/agenciasController';

class AgenciasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', agenciasController.list);
        this.router.get('/:id', agenciasController.getOne);
        this.router.put('/', agenciasController.create);
        this.router.put('/:id', agenciasController.update);
        this.router.delete('/:id', agenciasController.delete);
        this.router.post('/', agenciasController.prueba)

    }

}

const agenciaRoutes = new AgenciasRoutes();
export default agenciaRoutes.router;
