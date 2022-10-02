import './index.sass'
import { useState } from 'react';

export default function Index(){
    const abrirInput = () => document.getElementById("imagem").click();
    
    return(
        <section className="inputs">
            <img className='imagem' src= "/assets/icons/imagem.svg"  onClick={() => abrirInput()}/>
            <input type="file" id="imagem"/>
            <input id='mensagem' className = "input-texto" type="text" placeholder= "Digite sua mensagem" />
            <img className='img-enviar' src='/assets/icons/enviar.svg'/>
        </section>
    )
}