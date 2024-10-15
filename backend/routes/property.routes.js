import {Router} from 'express';
import { createProperty,getProperties,getPropertyFromCity } from '../controllers/propery.controller.js';

const propertyRouter = Router();


propertyRouter.post('/create',createProperty)
propertyRouter.get('/get',getProperties)
propertyRouter.post('/getPropertyFromCity',getPropertyFromCity);    

export default propertyRouter;