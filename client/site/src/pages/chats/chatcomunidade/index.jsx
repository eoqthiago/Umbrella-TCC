import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import Menu from "../../../components/menu";
import InputMensagem from "../../../components/input-mensagens";
import { mostrarCanais } from "../../../api/communityApi";
import { useParams } from "react-router-dom";
import "./index.sass";

const Index = () => {
    const [menu, setMenu] = useState(false);
    const [canal, setCanal] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        async function aparecerCanais() {
            const r = await mostrarCanais(id);
            setCanal(r);
        }

        aparecerCanais();
    }, []);

    return (
        <div>
            <div className="comunidade page">
                <Header menu alterarMenu={setMenu} estadoMenu={menu} />
                <Menu ativo={menu} alterar={setMenu} />

                <section className="comunidade-canais-page">
                    {canal.map((item) => (
                        <li>{item.nome}</li>
                    ))}
                </section>
            </div>

            <InputMensagem />
        </div>
    );
};

export default Index;
