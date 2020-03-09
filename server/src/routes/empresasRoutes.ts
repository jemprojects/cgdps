import { Router } from 'express';
import empresaController from '../controllers/empresasController';

class EmpresasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config() : void {
        this.router.get('/', empresaController.list);
        this.router.get('/:id', empresaController.getOne);
        this.router.put('/', empresaController.create);
        this.router.put('/:id', empresaController.update);
        this.router.delete('/:id', empresaController.delete);
        this.router.post('/', empresaController.prueba)

    }

}

const empresasRoutes = new EmpresasRoutes();
export default empresasRoutes.router;