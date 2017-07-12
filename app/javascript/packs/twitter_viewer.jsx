// Include in layout: <%= javascript_pack_tag 'twitter_viewer' %>
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Tweet from './tweet.jsx'
import $ from 'jquery'


class TwitterViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {handle: "", tweets: []};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// Pull tweets and append them to DOM
	handleSubmit(e) {

		e.preventDefault()

		const newHandle = document.getElementById("user-input").value

		$.ajax({
			url: "/pull_tweets",
			data: {handle: newHandle},
			method: "POST"
		}).done((result) => {
			this.setState({handle: newHandle, tweets: result})
		})

	}

	render() {

		const tweets = this.state.tweets.map((tweet) => {
			<Tweet date={"asdf"} content={"asdf"} />
		})


		return(
		  <div>
			  <div>Type in a username and hit enter to see 25 of their tweets</div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Handle:
						@<input type="text" id="user-input"/>
					</label>
					<input type="submit" value="Submit" />
				</form>
				<div>
				View tweets:
					{tweets}
					<Tweet date={"asdf"} content={"asdf"} />
				</div>
			</div>
		)
	}
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <TwitterViewer name="TwitterViewer" />,
    document.body.appendChild(document.createElement('div')),
  )
})
