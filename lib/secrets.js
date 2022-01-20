module.exports = {

    repo : {
        host: process.env.DB_HOST || "192.168.0.4",
        port: process.env.DB_PORT || 3307,
        database : process.env.DB_NAME ||"Liveliterate.com",
        user : process.env.DB_USER || "root",
        password : process.env.DB_PASSWORD ||"top$ecret",
        connectionLimit: process.env.DB_CONNECTIONS || 5
      }       
}
