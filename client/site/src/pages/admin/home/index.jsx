import "./index.sass";
import Header from "../../../components/header";
import MenuAdm from "../../../components/menu-adm";
import CardsEstatisticas from "../../../components/cards-estatiticas";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, } from "chart.js";
import { Pie } from "react-chartjs-2";


ChartJS.register(ArcElement, Tooltip, Legend);

function Index() {
    const data = {
        labels: [],
        datasets: [
            {
                data: [10, 10, 80],
                backgroundColor: ["#2CA75D", "#48DC83", "#0C5500"],
                borderWidth: 0,
            },
        ],
    };
    return (
        <div className="admin page">
            <main>
                <Header />
                <MenuAdm />

                <section className="cards-estastisticas-admin">
                    <div className="cards-estatisticas">
                        <div className="cards-01">
                            <CardsEstatisticas
                                cards_estatisticas="card_visitas_mensais"
                                numeroEstatistica="23.156"
                                nomeEstatistica="Total de usuários novos (mensal)"
                            />
                            <CardsEstatisticas
                                cards_estatisticas="cards_visitas"
                                numeroEstatistica="72.193"
                                nomeEstatistica="Total de visitantes"
                            />
                        </div>
                        <div className="cards-02">
                            <CardsEstatisticas
                                cards_estatisticas="cards_comunidades"
                                numeroEstatistica="6874"
                                nomeEstatistica="Comunidades criadas"
                            />
                        </div>
                    </div>
                </section>
                <div className="linhamds">
                    <hr className="linha-divisoria" />
                </div>
                <section className="admin-pizza-grafico">
                    <div className="pizza-grafico">
                        <div className="faixa-etaria-titulo">
                            <p>FAIXA ETARIA DO NOSSO PUBLICO ALVO</p>
                        </div>
                        <div className="grafico-pizza">
                            <Pie data={data} />
                        </div>
                        <div className="informacoes-graficos">
                            <img className="dados-graficos" src="/assets/icons/bola-verde1.svg" />
                            <p className="informacoes">DOS 13 AOS 15 ANOS</p>
                            <img className="dados-graficos" src="/assets/icons/bola-verde2.svg" />
                            <p className="informacoes">DOS 16 AOS 18 ANOS</p>
                            <img className="dados-graficos" src="/assets/icons/bola-verde3.svg" />
                            <p className="informacoes">ACIMA DOS 18 ANOS</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Index;
