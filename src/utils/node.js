import { svgns } from './svg.js';

export function hideNode ( node ) {
	node.__ramjetOriginalTransition__ = node.style.webkitTransition || node.style.transition;
	node.__ramjetOriginalOpacity__ = node.style.opacity;

	node.style.webkitTransition = node.style.transition = '';

	node.style.opacity = 0;
}

export function showNode ( node ) {
	if ( '__ramjetOriginalOpacity__' in node ) {
		node.style.transition = '';
		node.style.opacity = node.__ramjetOriginalOpacity__;

		if ( node.__ramjetOriginalTransition__ ) {
			setTimeout( () => {
				node.style.transition = node.__ramjetOriginalTransition__;
			});
		}
	}
}

export function cloneNode ( node ) {
	const clone = node.cloneNode();

	const isSvg = node.parentNode && node.parentNode.namespaceURI === svgns;

	if ( node.nodeType === 1 ) {
		const width = node.style.width;
		const height = node.style.height;

		clone.setAttribute( 'style', window.getComputedStyle( node ).cssText );

		if ( isSvg ) {
			clone.style.width = width;
			clone.style.height = height;
		}

		const len = node.childNodes.length;
		let i;

		for ( i = 0; i < len; i += 1 ) {
			clone.appendChild( cloneNode( node.childNodes[i] ) );
		}
	}

	return clone;
}
