const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST || 'readreplica-vidplay-database.cgnlh0uqvvyo.us-east-1.rds.amazonaws.com',
    database: process.env.MYSQL_DATABASE || 'vidplay',
    user: process.env.MYSQL_USER || 'developer',
    password: process.env.MYSQL_PASSWORD || 'DeveloperPassword!'
  }
});

exports.query = async query => {
  try {
    const results = await db.query(query);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
};
