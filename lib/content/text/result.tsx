import wordDict from "assets/word.json";
import wordDict_2 from "assets/output_8k.json";

import "assets/css/style.css";

import ResultPage from "~pages/Result";

export default function ResultPopup(props) {

	return (
		<div
			id="result"
			style={{
				position: "absolute",
				top: props.mousePos.y - 110,
				left: props.mousePos.x + 110,
				height: "500px",
				width: "600px",
				zIndex: "9999999999"
			}}>
			<ResultPage
				data={props.data}
			/>
		</div>
	);
}
