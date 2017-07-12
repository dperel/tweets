// Include in layout: <%= javascript_pack_tag 'tweet' %>
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Tweet extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.date)
		return (
			<div className="tweet">
				{this.props.date} {this.props.content}
			</div>
		);
	}

}
