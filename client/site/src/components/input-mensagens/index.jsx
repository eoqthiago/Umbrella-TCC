import './index.sass'

export default function Index(){
    return(
        <section className="inputs">
            <input className ="input-imagem"type="file" />
            <input id='mensagem' className = "input-texto" type="text" placeholder= "Digite sua mensagem" />
        </section>
    )
}