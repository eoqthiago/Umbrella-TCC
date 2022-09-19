import React from "react";
import "./index.sass";

const Index = (props) => {
	return (
		<div className="comp-card" title={props.msg}>
			<img src="/assets/images/star-wars.webp" alt="Comunidade" />
			<div>Comunidade fã de Star Wars</div>
		</div>
	);
};

export default Index;
