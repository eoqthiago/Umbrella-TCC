import React, { useState, useRef, useEffect } from "react";
import { Router, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import localStorage from "local-storage";
import LoadingBar from "react-top-loading-bar";

import { userAlterarEmail } from "../../../api/userApi";
import { BotaoSolido, Input, SubTitulo, Titulo } from "../../../styled";
import "./index.sass";

export default function Index() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  async function confirmarClick() {
    setLoading(true);
    ref.current.continuousStart();
    try {
      const r = await userAlterarEmail(email);
      localStorage("user", r);
      toast.success("🚀 Email alterada com sucesso!");
      localStorage.remove("user");
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
            Alterar email
          </Titulo>
          <SubTitulo cor="#3F3F3F" fonte="2.5vw">
            Insira seu novo email
          </SubTitulo>
        </div>
        <div className="email-corpo">
          <div className="email-inputs">
            <Input
              placeholder="Novo email"
              width="100%"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
