import styled from "styled-components";

const Titulo = styled.h1`1
	font-weigth: 800;
	font-size: 38px;
	line-height: 40px;
	text-transform: uppercase;
	color: ${(props) => props.cor || "#fff"};
	font-family: 'OpenSans-bold', sans;
`;

const SubTitulo = styled.h2`
	margin-top: .5em;
	font-family: Roboto-regular;
	font-size: 20px;
	color: ${(props) => props.cor || "#fff"};
	`

export { Titulo, SubTitulo };
