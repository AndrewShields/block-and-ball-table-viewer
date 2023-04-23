import React from "react";
import "./Toolbar.css";

export interface IToolbarProps {
	//
}

export const Toolbar: React.FunctionComponent<IToolbarProps> = (props: IToolbarProps) => {
	return (
		<div className="toolbar">
			<span id="toolbar-title">Table Viewer</span>
		</div>
	);
}
