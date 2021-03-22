//variales
const botonEncriptar=document.querySelector('#boton-uno');
const botonGuardar=document.querySelector('#boton-dos');
const password=document.querySelector('.input__password');
const web=document.querySelector('.input__web');
const mostrar=document.querySelector('#informacion');
const mensaje=document.querySelector('#web');
let objeto=[];


//eventos
evenListener();
function evenListener(){
  document.addEventListener('DOMContentLoaded', iniciarApp);

  botonEncriptar.addEventListener('click', (e) => {
    e.preventDefault();
    codificar(password.value.trim());
    error('Introduce una contraseña');
  });

  botonGuardar.addEventListener('click', (e)=>{
    e.preventDefault();
    error('Debes rellenar los campos');
    obtenerDatos();
  });
}

//funciones
function iniciarApp(){
  objeto=JSON.parse(localStorage.getItem('contraseñaSifrada')) || [];
  console.log(objeto);
  crearHtml();
}

function error(dato){
  if(password.value === '' && web.value === ''){
    const crearHtml=document.createElement('p');
    crearHtml.textContent=`${dato}`;
    crearHtml.classList.add('alert');
    mensaje.style.display='flex';
    mensaje.appendChild(crearHtml);

    setTimeout(()=>{
    mensaje.style.display='none';
    crearHtml.remove();
    },3000)
  }
}

function obtenerDatos(){
  if(objeto.length > 0){
     limpiarHtml();
  }
  const nuevo={
  password: password.value,
  paginaWeb: web.value,
  id: Date.now(),
  };

  objeto=[...objeto,nuevo];

  crearHtml();

  localStorage.setItem('contraseñaSifrada',JSON.stringify(objeto));
};

function codificar(dato){
  if(dato != ''){
    var key=CryptoJS.enc.Utf8.parse('8080808080808080');
    var iv=CryptoJS.enc.Utf8.parse('8080808080808080');

    var encrytarPassword=CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(dato),key,{
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    password.value = encrytarPassword;
  }
}

function crearHtml(){

  if(objeto.length > 0){
   

    objeto.forEach((dato)=>{
    const crearHtml=document.createElement('tr');
    crearHtml.innerHTML=`
    <td class='query1400 contraseña'>${dato.password}</td>
    <td class='query1400 web'>${dato.paginaWeb}</td>
    <td class='query800 web'>Password o contraseña ${dato.password}</td>
    <td class='query800 web contraseña'>Pagina Web  ( ${dato.paginaWeb} )</td>`;

    mostrar.appendChild(crearHtml);

    password.value='';
    web.value='';
  });
  }
}

function limpiarHtml(){
  while(mostrar.firstChild){
    mostrar.removeChild(mostrar.firstChild);
  }
}