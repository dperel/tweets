// Include in layout: <%= javascript_pack_tag 'twitter_viewer' %>
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Tweet from 'react'
import $ from 'jquery'


class TwitterViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {handle: "", tweets: []};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateIt = this.updateIt.bind(this);
	}

	// Pull tweets and append them to DOM
	handleSubmit(e) {
		e.preventDefault()

		const newHandle = document.getElementById("user-input").value

		$.ajax({
			url: "/pull_tweets",
			data: {handle: newHandle},
			method: "POST"
		}).done(function(msg){
			this.updateIt(handle, msg)
		}).fail(function(msg){
			console.log("There was an error")
		})
	}

	updateIt(handle, tweets) {
		this.setState({handle: newHandle, tweets: msg})
	}

	render() {

		const tweets = this.state.tweets.map((tweet) => {
			<Tweet content={tweet} />
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
