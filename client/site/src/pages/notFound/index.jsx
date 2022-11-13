import "./index.sass";
import { BotaoLiso } from "../../styled";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
export default function Index() {

    const navigate = useNavigate();

    return (
        <div className="notfound page">
            <main>
                <Header />
                <div className="pagenotfound">
                    <div className="notfound-textos">
                        <h1>404</h1>
                        <p>Ops! não encontramos para onde você quer navegar:(</p>
                        <BotaoLiso fonte="4vw" main="#fff" onClick={() => navigate('/')}>Voltar para home</BotaoLiso>
                    </div>

                </div>
            </main>

        </div>
    )

};

