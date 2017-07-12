// Include in layout: <%= javascript_pack_tag 'twitter_viewer' %>
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Tweet from './tweet.jsx'
import $ from 'jquery'


class TwitterViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {handle: "", tweets: [], status: "Search for some tweets!"};
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
			this.setState({handle: newHandle, tweets: result, status: result.length? "" : "No results for that username. Sorry!"})
		})

	}

	render() {

		let tweets = []
		this.state.tweets.map((tweet) => {
			let date = new Date(tweet[0]).toLocaleString()
			tweets.push(<Tweet date={date} content={tweet[1]} key={date} />)
		})

		return(
		  <div className="twitter-viewer">
			  <div className="title-line">Type in a username and hit enter to see 25 of their tweets</div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Handle:
						@<input type="text" id="user-input" required={true} placeholder={"For example @nyt"}/>
					</label>
					<input className="submit-button" type="submit" value="Submit"  />
				</form>
				<div className="tweets-container">
					{this.state.status}
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
