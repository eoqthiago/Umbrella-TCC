import './index.sass'

function MenuAdm() {
    return (
        <main className='admin-home'>
            <section className='admin'>
                <div className='admin-funcoes'>
                    <hr className='linhas-menu'></hr>
                    <p className='admin-textos'>Home</p>
                    <hr className='linhas-menu'></hr>
                    <p className='admin-textos'>Estaticiacas</p>
                    <hr className='linhas-menu'></hr>
                    <p className='admin-textos'>Banimento de contas</p>
                    <hr className='linhas-menu'></hr>
                    <p className='admin-textos'>Cadastrar Administrador</p>
                    <hr className='linhas-menu'></hr>
                    <p className='admin-textos'>Sair</p>
                    <hr className='linhas-menu'></hr>
                </div>
            </section>
        </main>
    )
}

export default MenuAdm;