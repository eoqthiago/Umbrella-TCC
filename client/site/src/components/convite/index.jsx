import './index.sass'
import { BotaoSolido, Titulo } from '../../styled';

const Index = () => {
    return (
        <div className='comp-convite'>
            <main>
                <section className='convite'>
                    <img
                        src={'/assets/images/doodles.webp'}
                    />
                    <div>
                        <div>
                            <Titulo cor='#131313'>
                                Comunidade Legal
                            </Titulo>
                            <div> Usuario convidou você para entrar na comunidade legal </div>
                        </div>
                        <BotaoSolido width='50%'>
                            Entrar
                        </BotaoSolido>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Index;