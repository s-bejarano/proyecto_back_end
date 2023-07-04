const form = document.getElementById('formIngreso');
const regis = document.getElementById('register');


form.addEventListener('submit', async (event)=> {

    event.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => (obj[key]= value));
    const response = await fetch("/sesiones/login",{
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    if(responseData.status === "success") {
        window.location.replace("/productosM")
    }

     else {
        if(responseData.status === "error") 

        alert("Usuario o contraseña incorrectos")
    }
   
    console.log(responseData);
});
regis.addEventListener('submit', async (event)=> {

    event.preventDefault();
 
    const response = await fetch("/sesiones/regis",{
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json();
    if(responseData.status === "success") {
        window.location.replace("/registro")
    }

     
  
});