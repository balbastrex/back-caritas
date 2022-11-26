import { Request, Response } from 'express';
import { Order } from '../../../../entities/Order';

const orderParamPolicies = async (req: Request, res: Response, next: Function) => {
  switch (req.method) {
    case 'GET':
      readOrderStatusParamsPolicy(req, res, next);
      break;
    case 'PUT':
    case 'POST':
      await writeOrderStatusParamsPolicy(req, res, next);
  }
};

const readOrderStatusParamsPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> Read|Order|Status|ParamsPolicy')

  next();
}

const writeOrderStatusParamsPolicy = async (req: Request, res: Response, next: Function) => {
  console.log('==> Write|Order|Status|ParamsPolicy')

  const order = await Order.findOne(req.params.orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found.' });
  }

  res.locals.order = order;

  // With this flag avoid to execute the policies twice. As we have similar route.
  res.locals.validated = true;
  next();
}

export default orderParamPolicies;
