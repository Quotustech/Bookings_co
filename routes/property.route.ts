import { Router } from "express";
import {createpropertyInfo} from '../controller/propertyInfo.controller';
import {createPropertyAddress} from '../controller/propertyaddress.controller';
import {createPropertyAminite} from '../controller/propertyaminite.controller';



const router = Router();

router.route("/createProperty").post(createpropertyInfo as any);

router.route("/createPropertyAddress").post(createPropertyAddress as any);

router.route("/createPropertyAminites").post(createPropertyAminite as any);





export default router;