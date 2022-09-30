import React from "react";
import Header from "../../components/header";
import localStorage from "local-storage";
import { BotaoSolido, Titulo } from "../../styled";
import "./index.sass";

const Index = () => {
	return (
		<div className="config page">
			<Header voltar />
			<main>
				<section>
					<Titulo fonte="1vw" cor="#131313">
						Minha conta
					</Titulo>
					<div>
						<li>ID de usuário: {localStorage("user").id ?? ""}</li>
						<li>Email: {localStorage("user").email ?? ""}</li>
						<li>Senha: *********</li>
					</div>
					<div>
						<BotaoSolido cor="#E43636" fonte="1.2vw">
							Deletar Conta
						</BotaoSolido>
						<BotaoSolido cor="#808384" fonte="1.2vw">
							Alterar Senha
						</BotaoSolido>
						<BotaoSolido fonte="1.2vw">Alterar Email</BotaoSolido>
					</div>
				</section>
				<section>
					<Titulo fonte="1vw" cor="#131313">
						Aplicação
					</Titulo>
					!!!!AINDA NÃO DECIDIDO!!!!
				</section>
				<section className="config-termos">
					<Titulo fonte="1vw" cor="#131313">
						Termos e Condições
					</Titulo>
					<div>
						<p>
							Requisitos de idade e responsabilidade dos pais e responsáveis. Ao acessar nossos serviços, você confirma que tem pelo menos 13 anos e atende à idade mínima de
							consentimento digital em seu país. Mantemos uma lista de idades mínimas em todo o mundo como um recurso para você, mas não podemos garantir que seja sempre precisa. Se você
							tem idade suficiente para acessar nossos serviços em seu país, mas não tem idade suficiente para ter autoridade para consentir com nossos termos, seu pai ou responsável
							deve concordar com nossos termos em seu nome. Peça ao seu pai ou responsável para ler estes termos com você. Se você é pai ou responsável legal e permite que seu filho
							adolescente use os serviços, esses termos também se aplicam a você e você é responsável pela atividade de seu filho adolescente nos serviços.
						</p>

						<p>
							Autorizações e restrições Pode aceder e utilizar o Serviço tal como lhe é disponibilizado, desde que cumpra com o presente Contrato com e a lei. Pode ver ou ouvir Conteúdo
							para os seus fins pessoais, não comerciais.
						</p>
						<p>Aplicam-se as seguintes restrições à sua utilização do Serviço. Não está autorizado a:</p>
						<p>
							Aceder, reproduzir, transferir, distribuir, transmitir, emitir, apresentar, vender, licenciar, alterar, modificar ou, de qualquer outro modo, utilizar qualquer parte do
							Serviço ou qualquer Conteúdo, exceto: (a) conforme especificamente permitido pelo Serviço; (b) com consentimento prévio por escrito da Umbrella e, se aplicável, dos
							titulares dos direitos correspondentes; ou (c) conforme permitido pela lei aplicável; contornar, desativ ar, interagir de forma fraudulenta ou, de qualquer outro modo,
							interferir com o Serviço (ou tentar realizar alguma destas atividades), incluindo funcionalidades relacionadas com a segurança ou funcionalidades que: (a) impedem ou
							restringem a cópia ou outra utilização do Conteúdo ou (b) limitam a utilização do Serviço ou do Conteúdo; aceder ao Serviço através de quaisquer meios automatizados (como
							robôs, botnets ou scrapers) exceto (a) no caso de motores de pesquisa públicos, em conformidade com o ficheiro robots.txt da Umbrella; (b) com o consentimento prévio por
							escrito da Umbrella; (c) conforme permitido pela lei aplicável; recolher ou utilizar quaisquer informações que possam identificar uma pessoa (por exemplo, recolher nomes de
							utilizador ou caras), exceto se permitido pela pessoa em questão ou se autorizado ao abrigo da secção (3) acima;
						</p>
						<p>Utilizar o Serviço para distribuir conteúdo promocional ou comercial não solicitado ou outros pedidos indesejados ou solicitações em massa (spam);</p>
						<p>
							causar ou incentivar quaisquer medidas imprecisas de interação genuína dos utilizadores com o Serviço, incluindo através do pagamento a pessoas ou do fornecimento de
							incentivos para aumentar as visualizações, os gostos ou os não gostos de um vídeo, ou para aumentar os subscritores de um canal ou, de qualquer outro modo, manipular
							métricas; utilizar indevidamente qualquer processo de denúncia, sinalização, reclamação, disputa ou recurso, incluindo através de submissões infundadas, vexatórias ou
							levianas; realizar concursos no Serviço ou através do mesmo que não cumpram as diretrizes e políticas para concursos da Umbrella;
						</p>
						<p>
							Utilizar o Serviço para ver ou ouvir Conteúdo para além de uma utilização pessoal e não comercial (por exemplo, não pode exibir publicamente vídeos ou transmitir música a
							partir do Serviço); ou utilizar o Serviço para: (a) vender qualquer publicidade, patrocínios ou promoções colocados no Serviço ou no Conteúdo, à volta do mesmo ou inseridos
							no mesmo, que não os permitidos nas Políticas de Publicidade no Umbrella (por exemplo, posicionamentos de produtos conformes); ou (b) vender publicidade, patrocínios ou
							promoções em qualquer página de qualquer Website ou aplicação que inclua apenas Conteúdo do Serviço ou no qual o Conteúdo do Serviço seja a base principal de tais vendas
							(por exemplo, vender anúncios numa página Web em que os vídeos do Umbrella são o único conteúdo de valor).
						</p>

						<p>
							A Umbrella aceita certos métodos de pagamento. Estes podem variar de acordo com o país ou serviço pago e podem mudar de tempos em tempos. Você pode atualizar seus métodos
							de pagamento na seção "Faturamento" da página Configurações em sua conta Umbrella. Observe que a Umbrella não é responsável por quaisquer taxas ou encargos aplicados por
							sua instituição financeira ou emissor do método de pagamento relacionados ao processamento do seu pagamento. Em alguns casos, podemos permitir que você pague contra uma
							fatura. As faturas serão enviadas para o endereço de e-mail associado à sua conta e faturaremos no máximo quarenta e cinco (45) dias após a compra do serviço relevante.
							Todos os valores faturados são devidos e pagáveis no prazo de trinta (30) dias a partir da data da fatura, a menos que especificado de outra forma na própria fatura. Todos
							os valores são pagos em reais, salvo indicação em contrário.
						</p>
					</div>
				</section>
			</main>
			<div className="config-umbrella-logo" />
		</div>
	);
};

export default Index;
