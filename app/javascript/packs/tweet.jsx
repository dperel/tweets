// Include in layout: <%= javascript_pack_tag 'tweet' %>
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Tweet extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div>
				{this.props.date} {this.props.text}
			</div>
		);
	}

}
