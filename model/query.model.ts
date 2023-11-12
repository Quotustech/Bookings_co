import mongoose,{ Model, ObjectId } from 'mongoose';

interface User {
  _id: ObjectId;
}

interface QueryType {
    user: User;
    question: string;
    answer: string;
    createdAt: Date;
    updatedAt: Date;
  }

type QueryModelType = Model<QueryType>;

const querySchema = new mongoose.Schema<QueryType>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  }
},{
    timestamps:true,
  });

const Query = mongoose.model<QueryType, QueryModelType>('Query', querySchema);

export default Query