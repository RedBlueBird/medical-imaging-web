import express from 'express';
import patientRoutes from './patient.routes';
import diagnosisRoutes from './diagnosis.routes';
import uploadRoutes from './upload.routes';

const router = express.Router();

// Mount routes
router.use('/patients', patientRoutes);
router.use('/diagnosis', diagnosisRoutes);
router.use('/upload', uploadRoutes);

export default router;
