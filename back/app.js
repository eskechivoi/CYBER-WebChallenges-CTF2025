require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const corsOrigin = process.env.CORS_ORIGIN;
const corsMethods = process.env.CORS_METHODS.split(',');
const corsHeaders = process.env.CORS_HEADERS.split(',');

app.use(cors({
  origin: corsOrigin,
  methods: corsMethods,
  allowedHeaders: corsHeaders,
}));

app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/flag', require('./routes/flagRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});
