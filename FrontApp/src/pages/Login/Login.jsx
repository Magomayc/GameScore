import style from "./Login.module.css"
import Button from "react-bootstrap/Button" 
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    return(
        <div className={style.pagina_login}>
            <body>
                <Button variant="primary" 
                    type="button" className={style.botao_login} onClick={() => navigate("/home")}>
                    Login
                    
                </Button>
            </body>
        </div>
    )
}