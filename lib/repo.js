const mysql = require('mysql');
const settings = require('./secrets');

class REPO {

    constructor(){
        this.conn=null;     
    }

    init() {
        
        console.log("INIT DB!");
        const connection = mysql.createConnection(settings.repo);
        this.conn = connection;

        this.conn.connect(function(err) {            
            if (err) console.error("Error connecting to MySql : "+err);
            else {
                console.log("Connected to MySql!");
            }
          });

          connection.on('error' , (err) =>{
            console.log('db error detected ', err.code);
            if(err.code === 'PROTOCOL_CONNECTION_LOST')
                //setTimeout(() => {this.init},2000);
                this.init();
            else {
                console.log("Error code not mached.")
                throw err
            }
                
            
          })
    }

    getContents(){

        let sql="SELECT * from Contents"
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql, (error, results, fields) => {
                if (error) reject(error)
                fulfill(results)
            } )       
        })        
    }

    changeContent(id,content){
        let sql="UPDATE Contents set Content='"+content+"' where id="+id
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql , (error, results, fields) => {
                if (error) reject(error)
                fulfill(results)                
            })           
        })         
    }

    getTeam(){
        let sql="SELECT * from Team"
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql, (error, results, fields) =>{
                if (error) reject(error)
                fulfill(results)                 
            })
        })        
    }    

    changeTeamPicture(id,name) {
        let sql="UPDATE Team set picture='assets/img/team/"+name+"' where id="+id;
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql, (error, results, fields) =>{
                if (error) reject(error)
                fulfill(results)                       
            })
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
            this.conn.query(sql, (error, results, fields) =>{
                if (error) reject(error)
                fulfill(results)                       
            })
        })                    
    }

    getCourses(){
        let sql="SELECT * from Courses"
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql, (error, results, fields) => {
                if (error) reject(error)
                fulfill(results)                  
            })
        })        
    }  

    changeCourses(id,name, shortDesc){
        let sql="UPDATE Courses set shortDesc='"+shortDesc+"', name='"+name+"' where id="+id
        return new Promise( (fulfill, reject) =>{
            this.conn.query(sql, (error, results, fields) =>{
                if (error) reject(error)
                fulfill(results)                    
            })            
        })         
    }


}

module.exports = REPO;