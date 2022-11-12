import './Login.css'

function Login() {
  return (
        <main id="main">
                <div id="login_card">
                    <h2 id="login_title">Carteira Digital</h2>
                    <form id="login_form">
                        <input type={"email"} placeholder="Email" id="login_field"></input>
                        <input type={"password"} placeholder="Senha" id="login_field"></input>
                        <input id="login_btn" type="button" value="Entrar"></input>
                    </form>  
                </div>
        </main>
  );
}

export default Login;