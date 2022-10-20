import './index.sass'
import Header from "../../../components/header";
import MenuAdm from '../../../components/menu-adm';
import CardsEstatisticas from '../../../components/cards-estatiticas'

function Index() {
    return (
        <main>
            <Header />
            <MenuAdm />
            <div className='cards-estatisticas-home'>
                <CardsEstatisticas
                    nomeEstatistica="Total de usuários novos (mensal)"
                    numeroEstatistica="23.123"
                />

                <CardsEstatisticas
                    nomeEstatistica="Total de visitantes"
                    numeroEstatistica="72.987"
                />

                <CardsEstatisticas
                    nomeEstatistica="Comunidades criadas"
                    numeroEstatistica="6125"
                />
            </div>

        </main>
    )
}

export default Index;