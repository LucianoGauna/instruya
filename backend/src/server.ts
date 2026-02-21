import express from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.routes';
import alumnoRoutes from './alumno/alumno.routes';
import docenteRoutes from './docente/docente.routes';
import adminRoutes from './admin/admin.routes';
import superadminRoutes from './superadmin/superadmin.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/alumno', alumnoRoutes);
app.use('/docente', docenteRoutes);
app.use('/admin', adminRoutes);
app.use('/superadmin', superadminRoutes);

app.listen(PORT, () => {
  console.log(`API Instruya escuchando en http://localhost:${PORT}`);
});
