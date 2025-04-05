import style from './Sidebar.module.css';
import Logo from '../../assets/LogoPs.png'
import { SideBarItem } from './SidebarItem/SidebarItem';
import {MdGroup} from 'react-icons/md'



export function Sidebar({children}){

    return(
        <div>
            <div className={style.sidebar_conteudo}>

                <div className={style.sidebar_header}>
                    <img src={Logo} alt="Logo" className={style.logo} />

                    <hr className={style.linha}/>
                </div>

                <div className={style.sidebar_corpo}>
                    <SideBarItem texto="Usuários" link="/usuarios" logo={<MdGroup/>} />
                </div>

            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}