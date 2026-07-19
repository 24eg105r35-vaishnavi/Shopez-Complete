import { Router } from 'express';
import * as orderController from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/status', orderController.updateOrderStatus);
router.put('/:id/cancel', orderController.cancelOrder);

export default router;
