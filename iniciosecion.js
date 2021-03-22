const usuario=document.querySelector('.usuario__input');
const password=document.querySelector('.password__input');
const password2=document.querySelector('.password2');
const icono=document.querySelector('#web');
const eliminarIcono=document.querySelector('#vandera');
const boton=document.querySelector('.nuevo');
const boton2=document.querySelector('.existente');
const acceso={
  usuario:'',
  password:'',
};

evenListener();
function evenListener(){

  document.addEventListener('DOMContentLoaded', crearOnuevo);

  boton.addEventListener('click',(e)=>{
    e.preventDefault();
    crearCuenta();
    // location.href='index.html';
  });

  boton2.addEventListener('click',(e)=>{
    e.preventDefault();
    ingresar();
  });
}

function crearOnuevo(){
  if(localStorage.getItem('usuario') != null){
    document.querySelector('#repetir-password').style.display='none';
    document.querySelector('.nuevo').style.display='none';
    document.querySelector('.existente').style.display='inline-block';
  }else{
    document.querySelector('#repetir-password').style.display='block';
    document.querySelector('.nuevo').style.display='inline-block';
    document.querySelector('.existente').style.display='none';
  }
}

function crearCuenta(){
  if(usuario.value != '' && password.value != '' && password2.value != ''){
    obtenerDatos();
  }else{
    mensaje('Rellene todos los campos','alertError','flex','inline-block');
  }
}

function obtenerDatos(){
  if(password.value === password2.value){
    acceso.usuario=usuario.value;
    acceso.password=password.value;
    limpiarInput();
    encriptar();
  }else{
    mensaje('La contraseña no coinciden','alertError','flex','inline-block');
  }
}

function encriptar(){
  var usuario=CryptoJS.AES.encrypt(acceso.usuario,acceso.usuario);
  localStorage.setItem('usuario',usuario);

  var password=CryptoJS.AES.encrypt(acceso.password,acceso.password);
  localStorage.setItem('password',password);

  mensaje('Usuario creado correctamente','alertCorrecto','flex','none');

  setTimeout(()=>{
    location.href='principal.html';
    },2400)
}

function ingresar(){
  if(usuario.value != '' && password.value != ''){
    acceso.usuario=usuario.value;
    acceso.password=password.value;

    var verifivarUsuario=CryptoJS.AES.decrypt(localStorage.getItem('usuario'),acceso.usuario);

    var verificarPassword=CryptoJS.AES.decrypt(localStorage.getItem('password'),acceso.password);

    if(verifivarUsuario.toString(CryptoJS.enc.Utf8) === acceso.usuario && verificarPassword.toString(CryptoJS.enc.Utf8) === acceso.password){
      location.href='principal.html';
    }else{
      mensaje('Usuario o Contraseña incorrecta','alertError','flex','inline-block');
      setTimeout(()=>{
      password.value='';
      },3000)
    }
  }
}

function mensaje(mensaje,dato,dato2,dato3){
    const crearHtml=document.createElement('p');
    crearHtml.textContent=`${mensaje}`;
    crearHtml.classList.add(`${dato}`);
    icono.style.display=`${dato2}`;
    eliminarIcono.style.display=`${dato3}`;
    icono.appendChild(crearHtml);

    setTimeout(()=>{
    icono.style.display='none';
    crearHtml.remove();
    },3000)
}

function limpiarInput(){
  if(localStorage.getItem('usuario') != null){
    usuario.value='';
    password.value='';
  }else{
    usuario.value='';
    password.value='';
    password2.value='';
  }
}
