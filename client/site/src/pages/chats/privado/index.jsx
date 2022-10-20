import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import Menu from "../../../components/menu";
import InputMensagem from "../../../components/input-mensagem";
import { useNavigate, useParams } from "react-router-dom";
import "./index.sass";

const Index = () => {
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div>
            <div className="chat-privado">
                <Header menu alterarMenu={setMenu} estadoMenu={menu} />
                <Menu ativo={menu} alterar={setMenu} />
            </div>

            <InputMensagem/>
        </div>
    );
};

export default Index;