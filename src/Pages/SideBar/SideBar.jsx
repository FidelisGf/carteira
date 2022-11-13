import './SideBar.css'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
const user = localStorage.getItem('User')
function SideBar() {
    function redirectLoginPage() {
        const r = window.confirm('Realmente deseja sair?')
        if (r) {
            window.location.href = "/"
        }
    }

    return (
        <aside id="body-sidebar">
            <div id='head-sidebar'>
                <PermIdentityIcon id="icone-user" style={{ color: "white"}} />
                <p id="usuario"><b>{user}</b></p>
                <ExitToAppIcon id="icone-exit" style={{ color: "red"}} onClick={redirectLoginPage}/>
            </div>
            <hr></hr>
            <div id='list-sidebar'>
                <AccountBalanceWalletIcon id="icone-user" style={{ color: "white"}} />
                <p id="item-text"><b>Carteira</b></p>
            </div>
        </aside>
    );
  }
  
  export default SideBar;