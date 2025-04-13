import mysql from 'mysql2';

class DBService {
  private static connection: mysql.Connection;

  private constructor() {}

  public static getConnection(): mysql.Connection {
    if (!DBService.connection) {
      DBService.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Desenvolvedor@1',
        database: 'biblioteca'
      });
    }
    return DBService.connection;
  }
}

export default DBService;
