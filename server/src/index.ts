import express, {
Application
} from 'express';

import agenciasRoutes from './routes/agenciasRoutes';
import arboladurasRoutes from './routes/arboladurasRoutes';
import banderasRoutes from './routes/banderasRoutes';
import buquesRoutes from './routes/buquesRoutes';
import cors from 'cors';
import documentosRoutes from './routes/documentosRoutes';
import emp_serv_portRoutes from './routes/emp_serv_portRoutes';
import empresasRoutes from './routes/empresasRoutes';
import entradasRoutes from './routes/entradasRoutes'
import envasesRoutes from './routes/envasesRoutes';
import espRoutes from './routes/espRoutes';
import girosRoutes from './routes/girosRoutes';
import indexRoutes from './routes/indexRoutes';
import mercaderiasRoutes from './routes/mercaderiasRoutes';
import morgan from 'morgan';
import operacionesRoutes from './routes/operacionesRoutes';
import puertosRoutes from './routes/puertosRoutes';
import rubrosRoutes from './routes/rubrosRoutes';
import tiposRoutes from './routes/tiposRoutes';
import traficosRoutes from './routes/traficosRoutes';

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        

    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express.static(__dirname +'/dist/client'));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: false
        }));
        var bodyParser=require("body-parser")
        var session = require('express-session');
        var bodyParser = require('body-parser');
        
        
        this.app.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }));
        this.app.use(bodyParser.urlencoded({extended : true}));
        this.app.use(bodyParser.json());
    }

    routes(): void {
   
        this.app.use('/', indexRoutes);
        this.app.use('/agencias', agenciasRoutes);
        this.app.use('/entradas', entradasRoutes);
        this.app.use('/buques', buquesRoutes);
        this.app.use('/banderas', banderasRoutes);
        this.app.use('/arboladuras', arboladurasRoutes);
        this.app.use('/operaciones', operacionesRoutes);
        this.app.use('/puertos', puertosRoutes);
        this.app.use('/empresas', empresasRoutes);
        this.app.use('/envases', envasesRoutes);
        this.app.use('/mercaderias', mercaderiasRoutes);
        this.app.use('/banderas', banderasRoutes);
        this.app.use('/giros', girosRoutes);
        this.app.use('/esp', espRoutes);
        this.app.use('/rubros', rubrosRoutes);
        this.app.use('/emp_serv_port', emp_serv_portRoutes);
        this.app.use('/traficos', traficosRoutes);
        this.app.use('/tipos', tiposRoutes);
        this.app.use('/documentos', documentosRoutes);
  
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();