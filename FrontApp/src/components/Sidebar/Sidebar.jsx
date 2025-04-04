import style from './Sidebar.module.css';
import Logo from '../../assets/Logo.png'
import { SideBarItem } from './SidebarItem/SidebarItem';
import {MdGroup, MdInbox, MdSort} from 'react-icons/md'
import { BsArrowCounterclockwise } from "react-icons/bs";
import { HiDocumentCheck } from "react-icons/hi2";


export function Sidebar({children}){

    return(
        <div>
            <div className={style.sidebar_conteudo}>

                <div className={style.sidebar_header}>
                    <img src={Logo} alt="Logo tarefa360" className={style.logo} />

                    <hr className={style.linha}/>
                </div>

                <div className={style.sidebar_corpo}>
                    <SideBarItem texto="Usuários" link="/usuarios" logo={<MdGroup/>} />
                    <SideBarItem texto="Projetos" link="/projetos" logo={<MdInbox/>} />
                    <SideBarItem texto="Histórias" link="/historias" logo={<MdSort/>} /> <SideBarItem texto="Sprints" link="/sprints" logo={<BsArrowCounterclockwise />}/>
                    <SideBarItem texto="Tarefas" link="/tarefas" logo={<HiDocumentCheck />}/>

                </div>

            </div>
            <div className={style.pagina_conteudo}>
                {children}
            </div>
        </div>
    )
}