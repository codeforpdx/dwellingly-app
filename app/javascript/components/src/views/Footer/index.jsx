import React from "react";

import './styles/index.scss'

const Footer = () => {
	const amplifiedUrl = "https://www.amplifiedbydesign.com/";
	const codeforpdxUrl = "https://www.codeforpdx.org/";
	let date = new Date();
	let currYear = date.getFullYear();

	let renderAnchor = (url, innerText) => (
		<a
			target="_blank"
			rel="noopener noreferrer"
			className="is-menu-link"
			href={url}
		>
			{innerText}
		</a>
	);

	return (
		<footer className="dwellingly-footer">
			<p>
				<span className="bold">
					Made with love by {renderAnchor(amplifiedUrl, "Amplified By Design")}{" "}
					and {renderAnchor(codeforpdxUrl, "Code For PDX")}. Copyright ©{" "}
					{currYear}
				</span>
			</p>
		</footer>
	);
};

export default Footer;
