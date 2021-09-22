import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodeParser from 'body-parser';

export function setEnvironment(app) {
    if(process.env.NODE_ENV === 'production ') {
        setProdEnv(app);
    } else {
        setDevEnv(app);
    }
}

function setDevEnv(app) {
    process.env.DB_URL = 'mongodb://localhost:27017/dev-db';
    process.env.TOKEN_SECRET = 'my-development-secret';
    process.env.NODE_ENV = 'development';
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodeParser.json());
}

function setProdEnv(app) {
    process.env.DB_URL = 'mongodb+srv://username:password@cluster0.pdxnw.mongodb.net/prod-db';
    process.env.TOKEN_SECRET = 'my-production-secret';
    process.env.NODE_ENV = 'production';
    app.use(bodeParser.json());
    app.use(express.static(__dirname + '/../../dist'));
}