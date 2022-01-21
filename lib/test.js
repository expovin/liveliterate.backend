var allowedOrigins = ['https://liveliterate.com',
                      'http://192.168.0.2:3001',
                      'http://localhost:3000',
                      'http://localhost:3001',
                      'http://localhost:3002',
                      'http://admin.liveliterate.com',
                      'https://admin.liveliterate.com'];


                      console.log(process.argv);

                      if(allowedOrigins.indexOf(process.argv[2]) !== -1){
                          console.log("Dominio "+process.argv[2]+" Abilitato")
                      }   
                      else {
                        console.log("Dominio "+process.argv[2]+" NON Abilitato")
                      }                   