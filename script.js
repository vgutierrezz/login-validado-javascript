document.addEventListener('DOMContentLoaded', function () {
  
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const showHideButton = document.getElementById('show-hide');

    loginForm.addEventListener('submit', function(event){
        event.preventDefault();
        //to do agregar metodo que valide el form
        validarForm();
    })


    emailInput.addEventListener('blur', function(){
        validarEmail();
    })

    emailInput.addEventListener('change', function(){
        ocultarError(emailError);
    })

    passwordInput.addEventListener('change', function(){
        ocultarError(passwordError);
    })
    
    confirmPasswordInput.addEventListener('change', function(){
        ocultarError(confirmPasswordError);
    })

    showHideButton.addEventListener('click', function(){
        const icono = showHideButton.querySelector('i') //obtengo el elemento <i>

        if(passwordInput.type == 'password'){
            passwordInput.type = 'text';
            confirmPasswordInput.type = 'text';
            icono.classList.replace('fa-eye-slash', 'fa-eye'); // Cambia de fa-eye-slash a fa-eye
            icono.classList.replace('fa-solid', 'fa-regular'); // Cambia de sólido a regular
        }else{
            passwordInput.type = 'password';
            confirmPasswordInput.type = 'password';
            icono.classList.replace('fa-eye', 'fa-eye-slash'); // Cambia de fa-eye a fa-eye-slash
            icono.classList.replace('fa-regular', 'fa-solid'); // Cambia de regular a sólido
        }
    })

    function validarForm() {
        const isValidEmail = validarEmail();
        const isValidPassword = validarPassword();
        const passwordMatch = validarPasswordIguales();

        if(isValidEmail && isValidPassword && passwordMatch){
            //guardar mail en el local storage
            //y generar un json en consola
            guardarEnLocalStorage();
            alert('Has ingresado con exito');
        }
    }

    function validarEmail() {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const emailValue = emailInput.value.trim() //elimina los espacios vacios al principio y final

        if(!emailRegex.test(emailValue)){
            mostrarError(emailError, 'Ingresa un email válido!');
            return false
        }
        return true
    }

    function validarPassword() {
        const passwordValue = passwordInput.value.trim()
        if(passwordValue.length < 6 ){
            mostrarError(passwordError, 'Ingresa una contraseña de al menos 6 caracteres!');
            return false;
        }
        return true;
    }

    function validarPasswordIguales() {
        const passwordValue = passwordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim()

        if(passwordValue != confirmPasswordValue){
            mostrarError(confirmPasswordError, 'Las contraseñas no coinciden!');
            return false;
        }
        return true;
    }

    function mostrarError(element, menssage) {
        element.innerHTML = menssage;
        element.style.display = 'block';
    }

    function ocultarError(element) {
        element.innerHTML = '';
        element.style.display = 'none';
    }

    function guardarEnLocalStorage() {
        const emailValue = emailInput.value.trim();
        localStorage.setItem('email', emailValue);
        //Crear un json con lo datos ingresados
        const body = bodyBuilderJSON();
        console.log(body);
    }

    function bodyBuilderJSON() {
        return {
            "email" : emailInput.value,
            "password": passwordInput.value
        }
    }

})