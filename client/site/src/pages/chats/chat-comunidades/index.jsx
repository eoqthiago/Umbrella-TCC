import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import Menu from "../../../components/menu";
import InputMensagem from "../../../components/input-mensagem";
import { consultarCanais, excluirComunidade } from "../../../api/communityApi";
import { useNavigate, useParams } from "react-router-dom";
import "./index.sass";

const Index = () => {
    const [menu, setMenu] = useState(false);
    const [canal, setCanal] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        async function aparecerCanais() {
            const r = await consultarCanais(id);
            setCanal(r);
        }

        aparecerCanais();
    }, []);

    return (
        <div>
            <div className="comunidade page">
                <Header menu alterarMenu={setMenu} estadoMenu={menu} />
                <Menu ativo={menu} alterar={setMenu} />
                <section className="comunidade-canais-page" onClick={() => excluirComunidade(id) && navigate('/pesquisa')}>
                </section>
            </div>

            <InputMensagem/>
        </div>
    );
};

export default Index;