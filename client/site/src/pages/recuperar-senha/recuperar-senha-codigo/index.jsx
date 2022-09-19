
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";


import { BotaoSolido, Input, SubTitulo, Titulo } from "../../../styled";
import "./index.sass";


export default function Index () {

    const [codigo, setCodigo] = useState('');
    const navigate = useNavigate();
	const ref = useRef();

    return (
        <div className="email page">
            <LoadingBar color="#48d677" ref={ref} />
            <main>
                <div className="email-titulos">
                    <Titulo cor="#02C17D" fonte="4vw">
                        Recuperar senha
                    </Titulo>
                    <SubTitulo cor="#3F3F3F" fonte="2.5vw">
                        Insira o codigo enviado no email.
                    </SubTitulo>
                </div>
                <div className="email-corpo">
                    <div className="email-inputs">
                        <Input placeholder="Codigo" width="100%" type="email" value={codigo} onChange={(e) => setCodigo(e.target.value)}  />
                    
                    </div>
                    <div className="email-btn">
                        <BotaoSolido fonte="4vw" width="100%" onClick={() => navigate("/alterar-senha")}>
                            Confirmar
                        </BotaoSolido>
                        <div className="email-legenda">
                            Não possui uma conta? Faça seu cadastro <span onClick={() => navigate("/cadastro")}> aqui! </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );

}