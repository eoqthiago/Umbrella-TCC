import React, { useRef, useState } from "react";
import { BotaoSolido, Input, InputArea, SubTitulo, Titulo } from "../../../styled";
import "./index.sass";
import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

const Index = ({ ativo, state, idUsuario }) => {
    const [email, setEmail] = useState("");
    const [motivo, setMotivo] = useState("");
    const [loading, setLoading] = useState(false);
    const ref = useRef();

    function exit() {
        state(!ativo);
    }

    return (
        <div className={(ativo && "comp-modal-denuncia-user-ativo") + " comp-modal-denuncia-user"}>
            <LoadingBar ref={ref} color="#48d677" />
            <main>
                <button className="comp-modal-denuncia-user-exit" onClick={() => exit()} />
                <Titulo cor="#000" fonte="1vw">
                    Denunciar o usuário <b>NOME</b>
                </Titulo>
                <section>
                    <div className="comp-modal-denuncia-user-inputs">
                        <Input type="text" placeholder="Seu email" width="100%" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                        <InputArea type="text" placeholder="Motivo" width="100%" resize="none" height="120px" value={motivo} onChange={(e) => setMotivo(e.target.value)} disabled={loading} />
                    </div>

                </section>
                <section className="comp-modal-denuncia-user-botoes">
                    <BotaoSolido disabled={loading} cor="#f84a4a" fonte="1vw" onClick={exit}>
                        Cancelar
                    </BotaoSolido>
                    <BotaoSolido disabled={loading} cor="#929292" fonte="1vw" onClick={""}>
                        Denunciar
                    </BotaoSolido>
                </section>
            </main>
        </div>
    );
};

export default Index;
