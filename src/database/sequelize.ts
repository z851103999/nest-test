import { Sequelize } from 'sequelize-typescript';
import db from '../../config/db';

const sequelize = new Sequelize(db.mysql.database,db.mysql.user,db.mysql.password || null,{
    host:db.mysql.host,
    port:db.mysql.port,
    dialect:'mysql',
    pool:{
        max:db.mysql.connectionLimit,
        min:0,
        acquire:30000,
        idle:10000
    },
    timezone:'+08:00'
});

sequelize.authenticate()
.then(()=>{
    console.log('success')
})
.catch((err:any)=>{
    console.log('error')
    throw err;
})

export default sequelize;