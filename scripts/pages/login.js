
export function initLogin() {
  const loginBtn= document.getElementById('loginBtn');
  const errorMsg = document.getElementById('errorMsg');

  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if(!email || !password){
      errorMsg.style.display = 'block';
      errorMsg.textContent = 'Por favor, complete todos los campos.';
      return;
    }
    if(email === "admin@admin.com" && password === "Istea25"){
        window.location.href = 'crudProduct.html';
    }
    else {
      errorMsg.style.display = 'block';
      errorMsg.textContent = 'Correo o contraseña incorrectos';
    }
})
}