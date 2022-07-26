import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.sass';

export default function Index() {
    const navigate = useNavigate();

    return (
        <header>
            <img src='/assets/icons/logo.png' alt='Logo' />

            <nav>
                {/* depois faço um bagulho bacana aq */}
                <div onClick={() => navigate('/login')} >Login</div>
                <div onClick={() => navigate(-1)} >Voltar</div>
                <div>User</div>
            </nav>
        </header>
    );
}
