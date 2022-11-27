import './Login.css'

function Login() {
  var email;
  var password;

  function handleChange() {
      email = document.getElementById("email").value;
      password = document.getElementById("password").value;

      if (email) {
          if (!isValidEmail()) {
              addErrorMsg("Formato de email invalido", "emailError", false)
          }
          else{
              cleanErrorMsg("emailError")
          }
      }

      if (password) {
          if (!isValidPassword()) {
              addErrorMsg("Senha invalida (deve conter letras maiusculas, minusculas e pelo menos um caracter especial)", "passwordError", false)
          }
          else {
              cleanErrorMsg("passwordError")
          }
      }

  }

  function handleLogin() {
      if (isValidEmail() && isValidPassword()) { 
        window.location.href = "/wallet"
        localStorage.setItem('Login', 'Logado !')
      }
      else {
        addErrorMsg("Usuario ou Senha Invalido", "main_login_error")
      }
  }

  function addErrorMsg(msg, tagId, useTimeout=true) {
      document.getElementById(tagId).innerText = msg;
      if (useTimeout) {
          setTimeout(cleanErrorMsg, 2 * 1000, tagId)
      }
  }

  function cleanErrorMsg(tagId) {
      document.getElementById(tagId).innerHTML = null;
  }

  function isValidPassword() {
      var regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\W){8,}/
      if (regex.test(password)) {
          return true
      }
      return false
  }

  function isValidEmail() {
      var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (regex.test(email)) {
          return true
      }
      return false
  }


  window.addEventListener('keyup', handleChange)

  return (
        <main class="main" data-testid='login-page'>
                <div class="login_card">

                    <h2 class="login_title">Carteira Digital</h2>
                    <span id="main_login_error" class="errors"></span>

                    <form class="login_form">
                        <input type={"email"} placeholder="Email" class="login_field" id="email" data-testid='email'></input>
                        <span id="emailError" class="errors"></span>

                        <input type={"password"} placeholder="Senha" class="login_field" id="password" pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}" data-testid='password'></input>
                        <span id="passwordError" class="errors"></span>

                        <input class="login_btn" id="login_btn" type="button" value="Entrar" onClick={handleLogin} data-testid='login_btn'></input>
                    </form>  

                </div>
        </main>
  );
}

export default Login;