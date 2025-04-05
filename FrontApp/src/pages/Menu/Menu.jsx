import style from "./Menu.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/LogoPs.png'

export function Menu() {
    const navigate = useNavigate();

    const jogos = [
        { id: 1, nome: "The Witcher 3" },
        { id: 2, nome: "God of War" },
        { id: 3, nome: "Minecraft" },
        { id: 4, nome: "Elden Ring" },
        { id: 5, nome: "FIFA 24" },
    ];

    const irParaUsuarios = () => navigate("/usuario");
    const sair = () => navigate("/login");

    return (
        <div className={style.pagina_menu}>
            <div className={style.header}>
                <div className={style.topo_direita}>
                    <Button
                        variant="none"
                        className={style.botao_topo}
                        onClick={irParaUsuarios}
                    >
                        Usuários
                    </Button>
                    <Button
                        variant="none"
                        className={style.botao_topo}
                        onClick={sair}
                    >
                        Sair
                    </Button>
                </div>
            </div>

            <div className={style.menu_box}>
                {/* Substituindo o título pela logo */}
                <img
                    src={Logo}
                    alt="Logo GameScore"
                    className={style.logo}
                />

                <ul className={style.lista_jogos}>
                    {jogos.map((jogo) => (
                        <li
                            key={jogo.id}
                            className={style.item_jogo}
                            onClick={() => navigate(`/jogo/${jogo.id}`)}
                            style={{
                                backgroundImage: `url(/assets/jogos/${jogo.id}.jpg)`,
                            }}
                        >
                            <span>{jogo.nome}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
