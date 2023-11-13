import { Router } from "express";
import {createpropertyInfo} from '../controller/propertyInfo.controller';
import {createPropertyAddress} from '../controller/propertyaddress.controller';


const router = Router();

router.route("/createProperty").post(createpropertyInfo as any);

router.route("/createPropertyAddress").post(createPropertyAddress as any);




export default router;