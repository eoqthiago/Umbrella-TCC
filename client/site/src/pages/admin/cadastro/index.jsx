import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import localstorage from 'local-storage';
import { HashLoader } from 'react-spinners';
import Checkbox from '@mui/material/Checkbox';
import { userCadastro } from '../../../api/userApi';
import { BotaoSolido, Input, SubTitulo, Titulo } from '../../../styled';
import Modal from '../../../components/modals/textModal';
import './index.sass';

const condicoes = `
Requisitos de idade e responsabilidade dos pais e responsáveis.
Ao acessar nossos serviços, você confirma que tem pelo menos 13 anos e atende à idade mínima de consentimento digital em seu país. Mantemos uma lista de idades mínimas em todo o mundo como um recurso para você, mas não podemos garantir que seja sempre precisa.
Se você tem idade suficiente para acessar nossos serviços em seu país, mas não tem idade suficiente para ter autoridade para consentir com nossos termos, seu pai ou responsável deve concordar com nossos termos em seu nome. Peça ao seu pai ou responsável para ler estes termos com você. Se você é pai ou responsável legal e permite que seu filho adolescente use os serviços, esses termos também se aplicam a você e você é responsável pela atividade de seu filho adolescente nos serviços.



Autorizações e restrições
Pode aceder e utilizar o Serviço tal como lhe é disponibilizado, desde que cumpra com o presente Contrato com e a lei.  Pode ver ou ouvir Conteúdo para os seus fins pessoais, não comerciais.


Aplicam-se as seguintes restrições à sua utilização do Serviço. Não está autorizado a:

Aceder, reproduzir, transferir, distribuir, transmitir, emitir, apresentar, vender, licenciar, alterar, modificar ou, de qualquer outro modo, utilizar qualquer parte do Serviço ou qualquer Conteúdo, exceto: (a) conforme especificamente permitido pelo Serviço;  (b) com consentimento prévio por escrito da Umbrella e, se aplicável, dos titulares dos direitos correspondentes; ou (c) conforme permitido pela lei aplicável;
contornar, desativ ar, interagir de forma fraudulenta ou, de qualquer outro modo, interferir com o Serviço (ou tentar realizar alguma destas atividades), incluindo funcionalidades relacionadas com a segurança ou funcionalidades que: (a) impedem ou restringem a cópia ou outra utilização do Conteúdo ou (b) limitam a utilização do Serviço ou do Conteúdo;
aceder ao Serviço através de quaisquer meios automatizados (como robôs, botnets ou scrapers) exceto (a) no caso de motores de pesquisa públicos, em conformidade com o ficheiro robots.txt da Umbrella; (b) com o consentimento prévio por escrito da Umbrella; (c) conforme permitido pela lei aplicável;
recolher ou utilizar quaisquer informações que possam identificar uma pessoa (por exemplo, recolher nomes de utilizador ou caras), exceto se permitido pela pessoa em questão ou se autorizado ao abrigo da secção (3) acima;

Utilizar o Serviço para distribuir conteúdo promocional ou comercial não solicitado ou outros pedidos indesejados ou solicitações em massa (spam);
causar ou incentivar quaisquer medidas imprecisas de interação genuína dos utilizadores com o Serviço, incluindo através do pagamento a pessoas ou do fornecimento de incentivos para aumentar as visualizações, os gostos ou os não gostos de um vídeo, ou para aumentar os subscritores de um canal ou, de qualquer outro modo, manipular métricas;
utilizar indevidamente qualquer processo de denúncia, sinalização, reclamação, disputa ou recurso, incluindo através de submissões infundadas, vexatórias ou levianas;
realizar concursos no Serviço ou através do mesmo que não cumpram as diretrizes e políticas para concursos da Umbrella;

Utilizar o Serviço para ver ou ouvir Conteúdo para além de uma utilização pessoal e não comercial (por exemplo, não pode exibir publicamente vídeos ou transmitir música a partir do Serviço); ou
utilizar o Serviço para: (a) vender qualquer publicidade, patrocínios ou promoções colocados no Serviço ou no Conteúdo, à volta do mesmo ou inseridos no mesmo, que não os permitidos nas Políticas de Publicidade no Umbrella (por exemplo, posicionamentos de produtos conformes); ou (b) vender publicidade, patrocínios ou promoções em qualquer página de qualquer Website ou aplicação que inclua apenas Conteúdo do Serviço ou no qual o Conteúdo do Serviço seja a base principal de tais vendas (por exemplo, vender anúncios numa página Web em que os vídeos do Umbrella são o único conteúdo de valor).



A Umbrella aceita certos métodos de pagamento. Estes podem variar de acordo com o país ou serviço pago e podem mudar de tempos em tempos. Você pode atualizar seus métodos de pagamento na seção "Faturamento" da página Configurações em sua conta Umbrella. Observe que a Umbrella não é responsável por quaisquer taxas ou encargos aplicados por sua instituição financeira ou emissor do método de pagamento relacionados ao processamento do seu pagamento. Em alguns casos, podemos permitir que você pague contra uma fatura. As faturas serão enviadas para o endereço de e-mail associado à sua conta e faturaremos no máximo quarenta e cinco (45) dias após a compra do serviço relevante. Todos os valores faturados são devidos e pagáveis no prazo de trinta (30) dias a partir da data da fatura, a menos que especificado de outra forma na própria fatura. Todos os valores são pagos em reais, salvo indicação em contrário.
`;

export default function Index() {
	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
	const [senhaconf, setSenhaconf] = useState('');
	const [nascimento, setNascimento] = useState();
	const [termos, setTermos] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [modal, setModal] = useState(false);

	async function handleCadastro() {
		if (!termos) return;

		localstorage.remove('user');
		setLoading(true);
		try {
			if (senha !== senhaconf) throw new Error('As senhas são coincidem');
			await userCadastro(nome, email, senha, nascimento);
			toast.success('🚀 Conta criada com sucesso!');
		} catch (err) {
			if (err.response) toast.error(err.response.data.err);
			else toast.warning(err.message);
		}
		setLoading(false);
	}

	function ativar() {
		setModal(!modal);
	}

	return (
		<div className='cadastro-admin page'>
			<HashLoader
				color='#2d95b1'
				loading={loading}
				cssOverride={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
					zIndex: '10',
					background: '#0000002d',
					width: '100vw',
					height: '100vh',
				}}
				size={50}
				aria-label='Loading Spinner'
				data-testid='loader'
			/>
			<Modal
				ativo={modal}
				state={ativar}
				titulo='Termos e condições'
				conteudo={condicoes}
			/>
			<main>
				<div className='cadastro-titulos'>
					<Titulo
						cor='#02C17D'
						fonte='4vw'>
						Cadastro
					</Titulo>
				</div>
				<div className='cadastro-corpo'>
					<div className='cadastro-inputs'>
						<Input
							placeholder='Nome de admin'
							width='100%'
							type='text'
							value={nome}
							onChange={e => setNome(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='Email'
							width='100%'
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
                        <Input
							placeholder='Endereço'
							width='100%'
							value={endereco}
							onChange={e => setEndereco(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='Data de nascimento'
							width='100%'
							onFocus={e => (e.target.type = 'date')}
							onBlur={e => (e.target.type = 'text')}
							value={nascimento}
							onChange={e => setNascimento(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='Telefone'
							width='100%'
							value={telefone}
							onChange={e => setTelefone(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='CPF'
							width='100%'
							value={cpf}
							onChange={e => setCpf(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='Senha'
							width='100%'
							type='password'
							value={senha}
							onChange={e => setSenha(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
						<Input
							placeholder='Confirme sua senha'
							width='100%'
							type='password'
							value={senhaconf}
							onChange={e => setSenhaconf(e.target.value)}
							disabled={loading}
							onKeyDown={e => e.key === 'Enter' && handleCadastro()}
						/>
					</div>
					<div className='cadastro-btn'>
						<BotaoSolido
							fonte='4vw'
							width='100%'
							onClick={handleCadastro}
							disabled={loading || !termos}>
							Confirmar
						</BotaoSolido>
						<div className='cadastro-legenda'>
							<div>
								Já possui uma conta? Clique <span onClick={() => navigate('/login')}> aqui </span> para fazer login
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};