import express, {
Application
} from 'express';

import buquesRoutes from './routes/buquesRoutes';
import cors from 'cors';
import entradasRoutes from './routes/entradasRoutes'
import indexRoutes from './routes/indexRoutes';
import loginRoutes from './routes/loginRoutes';
import morgan from 'morgan';

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        

    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);

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
        this.app.use('/buques', buquesRoutes);
        this.app.use('/entradas', entradasRoutes);
  
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();