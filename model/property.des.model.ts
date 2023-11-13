import mongoose, { Document, Schema, Types} from 'mongoose';
import {PropertyInfoType, PropertyInfo} from '../model/property.info.model'

interface PropertyDesType extends Document {
    propertyInfo: Types.ObjectId | PropertyInfoType;
    photo: string; 
    property_description:string;

}


const propertyDesSchema = new Schema<PropertyDesType>({
    propertyInfo: { type: Schema.Types.ObjectId, ref: 'PropertyInfo', required: true },
    photo: { type: String, required: true },
    property_description: { type: String, required: true },
    
});


const PropertyDes = mongoose.model<PropertyDesType>('PropertyDes', propertyDesSchema);

export  {PropertyDes,PropertyDesType};