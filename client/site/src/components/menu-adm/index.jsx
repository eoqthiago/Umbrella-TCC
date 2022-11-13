import { useState } from 'react';
import './index.sass'


function MenuAdm() {


    return (
        <div className='comp-menu-admin'>
            <main>
                <section className='menu-admin'>
                    <div className='admin-funcoes'>
                        <hr />
                        <p>Home</p>
                        <hr />
                        <p>Banimento de contas</p>
                        <hr />
                        <p>Banimento de grupos</p>
                        <hr />
                        <p>Cadastrar Administrador</p>
                        <hr />
                        <p>Sair</p>
                        <hr />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default MenuAdm;