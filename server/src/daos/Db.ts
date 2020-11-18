import mysql from 'mysql';

export class Db {
  private _connection: mysql.Connection;

  constructor() {
    this._connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: +(process.env.DB_PORT || '3306'),
    });
  }

  getConnection(): mysql.Connection {
    // TODO: посмотреть, как в mysql работает с соединениями. Держим одно или аналогично pg-bouncer.
    return this._connection;
  }
}
