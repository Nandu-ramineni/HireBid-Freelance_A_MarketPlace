import express from 'express';

import { getDbStatus } from '../config/dbStatusController.js';

const router = express.Router();

router.get('/db-status', getDbStatus);

export default router;
