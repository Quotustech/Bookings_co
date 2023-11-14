import mongoose, { Document, Schema, Types } from 'mongoose';
import {PropertyAddress,PropertyAddressType} from '../model/property.address.model';
import {PropertyAminite,PropertyAnimiteType} from '../model/property.aminites.model'

interface PropertyInfoType extends Document {
    property_name: string;
    property_email:string;
    property_contact:number;
    star_ratings:  mongoose.Types.Decimal128;
    property_code: string;
    property_address: Types.ObjectId |  PropertyAddressType;
    property_aminite: Types.ObjectId |  PropertyAnimiteType;
    image: string;
    description: string;

    
}


const propertyInfoSchema = new Schema<PropertyInfoType>({
    property_name: { type: String, required: true },
    property_email: { type: String, required: true },
    property_contact: { type: Number, required: true },
    star_ratings: { type: String, required: true },
    property_code: { type: String, required: true },
    property_address: { type: Schema.Types.ObjectId, ref: 'PropertyAddress' },
    property_aminite: { type: Schema.Types.ObjectId, ref: 'PropertyAminite' },
    image: { type: String },
    description: {type: String}
   
});


const PropertyInfo = mongoose.model<PropertyInfoType>('PropertyInfo', propertyInfoSchema);

export  {PropertyInfo,PropertyInfoType}; 