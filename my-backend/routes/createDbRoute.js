import express from 'express';
import db from '../dbConfig.js';

let createDbRouter = express.Router();

createDbRouter.route('/create').get(async (req, res) => {
    try{
        await db.sync({force : true})    
        res.status(201).json({message : 'created'})
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})
    }
});

export default createDbRouter;