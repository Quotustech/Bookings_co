import { Request, Response, NextFunction } from 'express';
import { PaymentMethod, PaymentMethodType } from '../../model/paymentmethod.model';
import { catchAsync } from '../../utils/catchAsync';
import { AppError } from '../../utils/appError';

const createPaymentMethod = catchAsync(
    async (req: Request, res: Response, next: NextFunction) =>{
        const {propertyInfoId, methods } = req.body;

        if (!methods || !Array.isArray(methods) || methods.length === 0) {
            return next(new AppError('Please provide at least one payment method', 400));
          }

          const newPaymentMethods = await PaymentMethod.create({propertyInfoId, methods });
          const totalPaymentMethods = await PaymentMethod.find();

          res.status(201).json({
            status: 'success',
            error: false,
            total_payment_methods: totalPaymentMethods.length,
            message: 'Payment methods registered successfully',
            data: newPaymentMethods,
          });

    }
);
export  {createPaymentMethod};

