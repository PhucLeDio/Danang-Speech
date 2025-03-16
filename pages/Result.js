import React from "react";

import Layer from "../components/Layer";
import MainFrame from "../components/Frame/MainFrame"

const ResultPage = (props) => {
	const { choice, name, data } = props;

	return (
		<div style={{ height: "500px", width: "600px" }}>
			<MainFrame />

			<Layer choice={choice} name={name} data={data} />

		</div>
	);
};

export default ResultPage;
