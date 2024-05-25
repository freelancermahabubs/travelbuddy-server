import express from 'express';

import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get(
    '/',
    auth( ENUM_USER_ROLE.ADMIN),
    AdminController.getAllFromDB
);

router.get(
    '/:id',
    auth( ENUM_USER_ROLE.ADMIN),
    AdminController.getByIdFromDB
);

router.patch(
    '/:id',
    auth( ENUM_USER_ROLE.ADMIN),
    AdminController.updateIntoDB
);

router.delete(
    '/:id',
    auth( ENUM_USER_ROLE.ADMIN),
    AdminController.deleteFromDB
);

router.delete(
    '/soft/:id',
    auth( ENUM_USER_ROLE.ADMIN),
    AdminController.softDelete
);

export const AdminRoutes = router;
