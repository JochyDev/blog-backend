const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');

const { dbConection } = require('../config/dbconfig');

// Routes
const { 
    postsRoutes, 
    sectionsRutes,
    subscribersRutes, 
    uploadsRoutes 
} = require('../routes')


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            posts: '/api/posts',
            sections: '/api/sections',
            subscribers: '/api/subscribers',
            uploads: '/api/uploads',
        }

        // Conection to DB
        this.conectionDB();

        //Middlewares
        this.middlewares();

        // Routas de mi aplicación
        this.routes();

    }

    async conectionDB(){
        await dbConection();
    }

    middlewares(){
        // Cors
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio Público
        this.app.use(express.static('src/public'));
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
          });
          
        // FileUpload - Carga de Archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes(){
        this.app.use(this.paths.posts, postsRoutes);
        this.app.use(this.paths.sections, sectionsRutes);
        this.app.use(this.paths.subscribers, subscribersRutes);
        this.app.use(this.paths.uploads, uploadsRoutes);
    }
    
    listen(){
        this.app.listen( this.port , () =>{
            console.log(`the app is runnig at port: ${this.port} `)
        })
    }
    
}


module.exports = Server;