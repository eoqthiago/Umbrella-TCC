import localStorage from 'local-storage';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userDelete } from '../../../api/userApi';
import { BotaoSolido, SubTitulo, Titulo } from '../../../styled';
import "./index.sass";

const Index = ({ id = 'modal', onClose = () => {}, children }) => {

	const navigate = useNavigate();
	const ref = useRef();
	const [loading, setLoading] = useState(false);
	

	const handleClick = (e) => {
		if(e.target.id === id) onClose();
	}

	async function confirmarClick() {
		setLoading(true);
		try {
		  const r = localStorage("user")
		  await userDelete(r);
		  toast.success("conta excluida");
		  localStorage.remove("user")
		  navigate("/");
		} catch (err) {
			toast.success("erro");
		  if (err.response) toast.error(err.response.data.err);
		  else toast.error(err.message);
		  setLoading(false);
		  ref.current.complete();
		}
	  }

	return (
		<div id={id} className="modal" onClick={handleClick} disabled={loading}>
			<div className="container">
				<button className="close" onClick={onClose}/>

				<div className="items">
					<Titulo fonte="1vw" cor="#131313">
						Deseja deletar sua conta?
					</Titulo>
					<SubTitulo fonte="1vw" cor="#131313">essa ação é irreversível! </SubTitulo>
					<div className="botoes-item">
						<BotaoSolido className='botao1-item' fonte="1.2vw" onClick={ confirmarClick}>Confirmar</BotaoSolido>
						<BotaoSolido  cor="#E43636" fonte="1.2vw" onClick={onClose} >Cancelar </BotaoSolido>

					</div>
				</div>
				
				<div className="content">{children}</div>
			</div>
			
		</div>
	);
};

export default Index;
