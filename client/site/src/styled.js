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
	margin: 0.2em 0;
	font-family: Roboto-regular;
	font-size: clamp(15px, ${(props) => props.fonte}, 20px);
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

const Input = styled.input`
	background: ${(props) => props.background || "F7F9FB"};
	width: clamp(100px, ${(props) => props.width}, 100%);
	color: ${(props) => props.cor || "#525252"};
	font-family: OpenSans-medium;
	height: 40px;
	font-size: clamp(15px, ${(props) => props.fonte}, 20px);
	user-select: none;
	padding: 10px 7px;
	margin-top: 15px;
	border: 1px solid #b8b8b8;
	border-radius: 5px;

	&:focus {
		outline-color: #17ba76;
	}

	&:disabled {
		cursor: not-allowed;
	}

	@media (max-width: 400px) {
		height: 30px;
		margin-top: 9px;
		font-size: 13px;
	}
`;

const InputArea = styled.textarea`
	background: ${(props) => props.background || "F7F9FB"};
	width: clamp(100px, ${(props) => props.width}, 100%);
	color: ${(props) => props.cor || "#525252"};
	font-family: OpenSans-medium;
	height: ${(props) => props.height || "150px"};
	font-size: clamp(15px, ${(props) => props.fonte}, 20px);
	user-select: none;
	padding: 10px 7px;
	margin-top: 15px;
	border: 1px solid #b8b8b8;
	border-radius: 5px;
	resize: ${(props) => props.resize || "none"};
	overflow: auto;

	&:focus {
		outline-color: #17ba76;
	}

	&:disabled {
		cursor: not-allowed;
	}

	@media (max-width: 400px) {
		height: 30px;
		margin-top: 9px;
		font-size: 13px;
	}
`;

const BotaoSolido = styled.button`
	background: ${(props) => props.cor || "#17ba76"};
	text-align: center;
	color: ${(props) => props.main || "#fff"};
	border-radius: 3px;
	border: none;
	width: ${(props) => props.width || "fit-content"};
	padding: ${(props) => props.padding || "10px 20px"};
	font-family: Roboto-medium;
	font-size: clamp(16px, ${(props) => props.fonte}, 18px);
	cursor: pointer;
	user-select: none;
	transition: 0.05s linear;

	&:active {
		transform: scale(1.02);
	}

	&:disabled {
		background: #51bb8f;
		cursor: not-allowed;

		&:active {
			transform: scale(1);
		}
	}
`;

export { Titulo, SubTitulo, BotaoLiso, Input, InputArea, BotaoSolido };
