import "./index.sass";
import { useState } from "react";

export default function Index() {
    const abrirInput = () => document.getElementById("imagem-mensagem").click();
    const [imagem, setImagem]= useState('');
    const exibirImagem= () => URL.createObjectURL(imagem);
    

    return (
        <section className="comp-input-mensagem">
            {!imagem && <img src="/assets/icons/imagem.svg" onClick={() => abrirInput()} />}
            {imagem && <img className="mensagem-imagem" src={exibirImagem()}/>} 
            <input type="file" id="imagem-mensagem" onChange={e => setImagem(e.target.files[0])}  />
            <input
                id="mensagem"
                className="input-texto"
                type="text"
                placeholder="Digite sua mensagem"
            />
            <img className="img-enviar" src="/assets/icons/enviar.svg" />
        </section>
    );
}
