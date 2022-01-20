const mysql = require('mariadb');
const settings = require('./secrets');

class REPO {
    

    init() {

        const pool = mysql.createPool(settings.repo);
        
        pool.getConnection()
        .then ( conn => {
            console.log("Connected to DB!")
            this.conn=conn
        })
        .catch( error => console.log("Error connecting to MariaDb :"+error))   
        
    }

    getContents(){
        let sql="SELECT * from Contents"
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql)
                .then(result => fulfill(result))
                .catch( error => reject(error))                
        })        
    }

    changeContent(id,content){
        let sql="UPDATE Contents set Content='"+content+"' where id="+id
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql)
                .then(result => fulfill(result))
                .catch( error => reject(error))                
        })         
    }

    getTeam(){
        let sql="SELECT * from Team"
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql)
                .then(result => fulfill(result))
                .catch( error => reject(error))     
        })        
    }    
    changeTeam(member){
        let sql="UPDATE Team set name='"+member.name+"' "
        if(member.title)     sql +=  ",title='"+member.title+"'"; else sql += ",title=null";
        if(member.quote)     sql +=  ",quote='"+member.quote+"'"; else sql += ",quote=null"
        if(member.twitter)   sql += ",twitter='"+member.twitter+"'"; else sql += ",twitter=null"
        if(member.facebook)  sql += ",facebook='"+member.facebook+"'"; else sql += ",facebook=null"
        if(member.instagram) sql += ",instagram='"+member.instagram+"'"; else sql += ",instagram=null"
        if(member.linkedin)  sql += ",linkedin='"+member.linkedin+"'"; else sql += ",linkedin=null"
        if(member.email)  sql += ",email='"+member.email+"'"; else sql += ",email=null"
        sql += " where id="+member.id;

        console.log(sql);
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql)
                .then(result => fulfill(result))
                .catch( error => reject(error))     
            })                    
    }

    getCourses(){
        let sql="SELECT * from Courses"
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql)
                .then(result => fulfill(result))
                .catch( error => reject(error))
        })        
    }  

    changeCourses(id,name, shortDesc){
        let sql="UPDATE Courses set shortDesc='"+shortDesc+"', name='"+name+"' where id="+id
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql)
                .then(result => fulfill(result))
                .catch( error => reject(error))                
        })         
    }


}

module.exports = REPO;