import { Router } from "express";
import {createpropertyInfo,getAllProperty,getPropertyInfoById,updatePropertyInfo,deleteProperty} from '../controller/propertyInfo.controller';
import {createPropertyAddress} from '../controller/propertyaddress.controller';
import {createPropertyAminite} from '../controller/propertyaminite.controller';



const router = Router();

// property router

router.route("/createProperty").post(createpropertyInfo as any);

router.route("/updateProperty/:id").put(updatePropertyInfo as any);

router.route("/deleteProperty").delete(deleteProperty as any);

router.route("/getAllProperty").get(getAllProperty as any);

router.route("/getProperty/:id").get(getPropertyInfoById as any);





// property address router

router.route("/createPropertyAddress").post(createPropertyAddress as any);

// property aminites router

router.route("/createPropertyAminites").post(createPropertyAminite as any);





export default router;