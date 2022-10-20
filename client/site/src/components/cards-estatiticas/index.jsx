import './index.sass'

const Index = props => {
    return (
        <main className='comp-cards-estatisticas'>
            <section className='cards-estatisticas' >
                <div className='icons-estatisticas'>
                    <img className='imagem-estatisticas' src='/assets/icons/olho.svg' />
                    <img className='imagem-estatisticas' src='/assets/icons/estatiticas.svg' />
                </div>
                <div className='estatisticas-conteudo'>
                    <p className='estatisticas'>{props.nomeEstatistica}</p>
                    <p className='estatisticas'>{props.numeroEstatistica}</p>
                </div>
                <hr className='linha-comp'></hr>
            </section>
        </main>
    )
}

export default Index;