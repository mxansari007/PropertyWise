import {Router} from 'express';
import { createProperty,getProperties } from '../controllers/propery.controller.js';

const propertyRouter = Router();


propertyRouter.post('/create',createProperty)
propertyRouter.get('/get',getProperties)    

export default propertyRouter;