// Include in layout: <%= javascript_pack_tag 'tweet' %>
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Tweet extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		let text = this.props.content
		return (
			<div className="tweet">
				<div className="tweet-date">
					{this.props.date}
				</div>
				<div className="tweet-content" dangerouslySetInnerHTML={ {__html: text} }>
				</div>
			</div>
		);
	}

}
