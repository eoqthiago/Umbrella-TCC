import React, { useState, useRef, useEffect } from "react";
import { Router, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import localStorage from "local-storage";
import LoadingBar from "react-top-loading-bar";

import { userAlterarPassword, userConsulta } from "../../../api/userApi";
import { BotaoSolido, Input, SubTitulo, Titulo } from "../../../styled";
import "./index.sass";

export default function Index() {
  const [senha, setSenha] = useState("");
  const [senhaCheck, setSenhaCheck] = useState("");
  const navigate = useNavigate();
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [parametro] = useSearchParams();
  const token = parametro.get("token");
  const id = parametro.get("id");

  useEffect(() => {
    async function verifQuery() {
      try {
        setLoading(true);
        
        ref.current.continuousStart();
        let idcode = Number(id);
        if (!token || !idcode) throw new Error();
        localStorage("user", { token: token });
        console.log(localStorage('user'));

        try {
          console.log(id, token);

          const r = await userConsulta(idcode);
          localStorage("user", r);
          console.log(r);
          if (r.id !== idcode) throw new Error();
          navigate("/alterar-senha");
        } catch (err) {
         
          navigate("/recuperar");
          toast.error("Link invalido");
        }
      } catch (err) {}
    }
    verifQuery();
  }, []);

  async function confirmarClick() {
    setLoading(true);
    ref.current.continuousStart();
    try {
      if (senha !== senhaCheck) throw new Error("Suas senhas não coincidem");

      const r = await userAlterarPassword(senha);
      localStorage("user", senha);
      toast.success("🚀 Senha alterada com sucesso!");
      localStorage.remove("user")
      navigate("/login");
    } catch (err) {
      if (err.response) toast.error(err.response.data.err);
      else toast.error(err.message);
      setLoading(false);
      ref.current.complete();
    }
  }

  return (
    <div className="email page">
      <LoadingBar color="#48d677" ref={ref} />
      <main>
        <div className="email-titulos">
          <Titulo cor="#02C17D" fonte="4vw">
            Recuperar senha
          </Titulo>
          <SubTitulo cor="#3F3F3F" fonte="2.5vw">
            Insira sua nova senha
          </SubTitulo>
        </div>
        <div className="email-corpo">
          <div className="email-inputs">
            <Input
              placeholder="Nova Senha"
              width="100%"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Input
              placeholder="Confirmar Senha"
              width="100%"
              type="password"
              value={senhaCheck}
              onChange={(e) => setSenhaCheck(e.target.value)}
            />
          </div>
          <div className="email-btn">
            <BotaoSolido fonte="4vw" width="100%" onClick={confirmarClick}>
              Confirmar
            </BotaoSolido>
          </div>
        </div>
      </main>
    </div>
  );
}
