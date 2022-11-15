import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import localStorage from 'local-storage';
import './index.sass'


function MenuAdm() {

    const navigate = useNavigate();
    function logout() {
        localStorage.remove('admin');
        toast.success('Logout feito com sucesso!');
        navigate('/');
    }
    return (
        <div className='comp-menu-admin'>
            <main>
                <section className='menu-admin'>
                    <div className='admin-funcoes'>
                        <hr />
                        <p onClick={() => navigate('/admin/dashboard')}>Home</p>
                        <hr />
                        <p onClick={() => navigate('/admin/denuncias/usuarios')}>Banimento de contas</p>
                        <hr />
                        <p onClick={() => navigate('/admin/denuncias/comunidades')}>Banimento de grupos</p>
                        <hr />
                        <p onClick={() => navigate('/admin/cadastro')}>Cadastrar Administrador</p>
                        <hr />
                        <p onClick={() => logout()}>Sair</p>
                        <hr />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default MenuAdm;