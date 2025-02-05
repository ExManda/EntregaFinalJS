



function ingresar() {

  alert("Bienvenido/a a la compra de trips de surf");
  alert("Por favor, ingrese su usuario");


  let intentos = 3;
  let identificar = true;

  do {
    let usuario = prompt("ingrese su usuario");
    let clave = prompt("ingrese su clave");

    if (usuario == null || usuario == "") {
      alert("No se encontró ese usuario, vuelva a intentarlo más tarde");
      break;
    }

    if (clave == null || clave == "") {
      alert("error en la contraseña, regrese más tarde")
      break;
    }

    if (usuario === "ExeManda" && clave === "1234Manda") {
      alert("Bienvenido "+ usuario);
      identificar = false;

    } else {
      intentos--;
      if (intentos > 0) {
        alert("Usuario o clave incorrectas. Te quedan "+ intentos);
      }
      else {
        alert("Superó los tres intentos permitidos, vuelva más tarde. Bye.");
        identificar = false;
      }

    }
  }



  while (identificar)
}
ingresar()



































/*
function ingresar() {

//variables
 let identificar = true
 let intentos = 3

 do { //bucle
   let usuario = prompt("ingrese su usuario");


   if(usuario == null || usuario == "") {
     alert("uh, no se entendió. Por favor, vuelva en otro momento");
     break;
   }

   if(usuario === "admin" && intentos <1){
     let pass = prompt ("Ingresa tu clave")
     



     
   }
   else{
     alert("no se reconoce el usuario "+ usuario + "le quedan "+ intentos)
     intentos--
 
     if(intentos<0){ //si lo intentos superan los 3
         alert("usted supero los tres intentos")
         break
     }
   }

 } while (identificar)
}
ingresar()










/*

function loguear() {
 let identificar = true
 let intentos = 1
 do {
   let usuario = prompt("ingresa tu usuario");

   if (usuario == null || usuario == "") { //si el usuario el nulo, se termina el proceso
     alert("no se reconoce el usuario, intente mas tarde")
     break;
   }
   if ((usuario == "admin" || usuario == "javier") && intentos <= 3) {

     let pass = prompt("ingresa tu contraseña")

     if (pass == null) { //lo saco del sistema si no pone contraseña
       break;
     }
     if (pass === "1234") {
       alert("bienvenido usuario ", usuario)
       identificar = false
     } else {
       alert("Contraseña incorrecta");
       intentos++
       if (intentos > 3) {
         alert("usted supero los 3 intentos, vuelva mas tarde"); // muestra al susario
         console.error("No se reconoce la pass");  //muestra en consola
         break;
       }
     }
   }
 } while (identificar)
}
loguear()
*/
