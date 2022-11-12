import "./index.sass";
import Header from "../../../components/header";
import MenuAdm from "../../../components/menu-adm";
import CardsEstatisticas from "../../../components/cards-estatisticas";
import { estatisticasComunidades, estatisticasDenuncias, estatisticasUsuarios } from "../../../api/communityApi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import faker from 'faker';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

function Index() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Total de usuarios',
            },
        },
    };

    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Agt', 'Set', 'Out', 'Nov', 'Dez'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Usuarios',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 3000 })),
                borderColor: '#48DC83',
                backgroundColor: '#48DC83',
            },
        ],
    };

    const data2 = {
        labels: [],
        datasets: [
            {
                data: [10, 10, 80],
                backgroundColor: ["#2CA75D", "#48DC83", "#0C5500"],
                borderWidth: 0,
            },
        ],
    };
    const [usuarios, setUsuarios] = useState([]);
    const [comunidades, setComunidades] = useState([]);
    const [denuncias, setDenuncias] =useState([])

    async function listarComunnity() {
        const r = await estatisticasComunidades();
        setComunidades(r)
    }

    async function listarUsers() {
        const r = await estatisticasUsuarios();
        setUsuarios(r);
    };
    async function listarReports() {
        const r = await estatisticasDenuncias();
        setDenuncias(r);
    };

    useEffect(() => {
        listarComunnity();
        listarUsers();
        listarReports();
    }, [])


    return (
        <div className="admin-page">
            <main>
                <Header />
                <MenuAdm />
                <div className="grafico-usuarios">
                    <div className="grafico-linha">
                        <Line options={options} data={data} />
                    </div>
                </div>
                <section className="items-baixo">
                    <div className="cards-estastisticas-admin">
                        <div className="cards-estatisticas">
                            <div className="cards-01">
                                {usuarios.map((item) => (
                                    <CardsEstatisticas
                                        cards_estatisticas="card_visitas_mensais"
                                        numeroEstatistica={item.usuariosMensais}
                                        nomeEstatistica="Total de usuários novos (mensal)"
                                    />))}
                                <CardsEstatisticas
                                    cards_estatisticas="cards_visitas"
                                    numeroEstatistica="72.193"
                                    nomeEstatistica="Total de visitantes"
                                />
                            </div>
                            <div className="cards-02">
                                {comunidades.map((item) => (
                                    <CardsEstatisticas
                                        cards_estatisticas="cards_comunidades"
                                        numeroEstatistica={item.comunidadesCriadas}
                                        nomeEstatistica="Comunidades criadas"
                                    />))}
                                {denuncias.map((item)=>(
                                <CardsEstatisticas
                                    cards_estatisticas="cards_denuncias"
                                    numeroEstatistica={item.usuariosReportados}
                                    nomeEstatistica="Denuncias de usuarios" />
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="admin-pizza-grafico">
                        <div className="pizza-grafico">
                            <div className="faixa-etaria-titulo">
                                <p>FAIXA ETARIA DO NOSSO PUBLICO ALVO</p>
                            </div>
                            <div className="grafico-pizza">
                                <Pie data={data2} />
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
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Index;
