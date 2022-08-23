import styled from "styled-components";

const TituloOpen = styled.div`1
	font-family: OpenSans-semibold !important;
	font-weigth: 800;
	font-size: 38px;
	line-height: 40px;
	text-transform: uppercase;
	color: ${(props) => props.cor || "#fff"};
`;

export { TituloOpen };
