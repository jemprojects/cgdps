import keys from './keys'
import mysql from 'promise-mysql'

const pool = mysql.createPool(keys.database)

pool.getConnection()
.then(conection => pool.releaseConnection(conection))

export default pool;