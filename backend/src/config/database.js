require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'neuroflow_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    define: {
      timestamps: true, // Adiciona createdAt e updatedAt
      underscored: true, // Snake case para colunas
    },
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'neuroflow_db_test',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
};
