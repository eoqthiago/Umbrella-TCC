import { useState } from 'react';
import './index.sass'


function MenuAdm() {


    return (
        <div className='comp-menu-admin'>
            <main>
                <section className='menu-admin'>
                    <div className='admin-funcoes'>
                        <p>Home</p>
                        <p>Banimento de contas</p>
                        <p>Banimento de grupos</p>
                        <p>Cadastrar Administrador</p>
                        <p>Sair</p>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default MenuAdm;