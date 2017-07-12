// Include in layout: <%= javascript_pack_tag 'tweet' %>

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

function Tweet(props){
	return (
		<div>
			{props.tweet}
		</div>
	);
}
