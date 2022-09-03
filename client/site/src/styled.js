import styled from "styled-components";

const Titulo = styled.h1`
	font-weigth: 800;
	font-size: clamp(25px, ${(props) => props.fonte}, 35px);
	line-height: 35px;
	text-transform: uppercase;
	color: ${(props) => props.cor || "#fff"};
	font-family: "OpenSans-bold", sans;
`;

const SubTitulo = styled.h2`
	margin-top: 0.5em;
	font-family: Roboto-regular;
	font-size: clamp(15px, ${(props) => props.fonte}, 22px);
	color: ${(props) => props.cor || "#fff"};
`;

const BotaoLiso = styled.button`
	background: ${(props) => props.background || "none"};
	color: ${(props) => props.main || "#4AC58A"};
	border: 2px solid ${(props) => props.main || "#4AC58A"};
	border-radius: 21px;
	width: ${(props) => props.width || "fit-content"};
	padding: ${(props) => props.padding || "7px 20px"};
	font-family: OpenSans-medium;
	font-size: clamp(15px, ${(props) => props.fonte}, 20px);
	cursor: pointer;
	user-select: none;
	transition: 0.2s ease-in-out;

	&:hover {
		transform: scale(1.05);
		transition: 0.1s linear;
	}

	&:active {
		transform: scale(1.02);
	}
`;

export { Titulo, SubTitulo, BotaoLiso };
