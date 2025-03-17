import React from "react";

import BackgroundBorder from "../BackgroundBorder";
import ResultSquare from "../ResultSquare";

const MainFrame = ({}) => {
    return (
        <div>
				<BackgroundBorder>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between"
						}}>
						<ResultSquare />
						<ResultSquare />
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							position: "absolute",
							bottom: "0",
							width: "100%"
						}}>
						<ResultSquare />
						<ResultSquare />
					</div>
				</BackgroundBorder>
			</div>
    );
}

export default MainFrame;