import fs from 'fs'

const data= fs.readFile( 'public/data.txt', 'utf-8', (err,data)=>{
    if(err){console.log("Error al leer el archivo: ", err) 
   return;
}
   console.log(data);
});
