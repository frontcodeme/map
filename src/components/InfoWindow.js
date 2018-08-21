import React from 'react'

function InfoWindow(props) {
	const { selectedMarker, infoContent } = props

	return (
		<aside
			className="info-window-box"
			tabIndex={0}
		>
			<h2>{selectedMarker.title}</h2>
			<article>
				{infoContent}
			</article>
		</aside>
	);
}

export default InfoWindow