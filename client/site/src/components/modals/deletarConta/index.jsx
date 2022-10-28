import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userDelete } from '../../../api/userApi';
import { BotaoSolido } from '../../../styled';
import "./index.sass";

const Index = ({ id = 'modal', onClose = () => {}, children }) => {

	const navigate = useNavigate();
	const ref = useRef();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');

	const handleClick = (e) => {
		if(e.target.id === id) onClose();
	}

	async function confirmarClick() {
		setLoading(true);
		ref.current.continuousStart();
		try {
		  const r = await userDelete(email);
		  toast.success("conta excluida");
		  navigate("/login");
		} catch (err) {
			toast.success("ca");
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
				<input type="email"  placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
				<BotaoSolido onClick={ confirmarClick}>Confirmar</BotaoSolido>
				<BotaoSolido onClick={onClose} >Cancelar</BotaoSolido>
				<div className="content">{children}</div>
			</div>
			
		</div>
	);
};

export default Index;
