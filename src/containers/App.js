import React, { Component } from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js'
import ErrorBoundary from '../components/ErrorBoundary.js';
import './App.css';

class App extends Component{
	constructor() {
		super()
		this.state = {
			robots: [],
			searchField: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.cypress.io/users')
		.then(response => response.json())
		.then(users => this.setState({ robots: users }));
	}

	onSearchChange = (event) => {
		this.setState({ searchField: event.target.value });
	}

	render() {
		const { robots, searchField } = this.state;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return !robots.length ?
			<>
			<div id="loading">
				<h1>Loading...</h1>
			</div>
			<div className="center">
			  <div className="wave"></div>
			  <div className="wave"></div>
			  <div className="wave"></div>
			  <div className="wave"></div>
			  <div className="wave"></div>
			  <div className="wave"></div>
			  <div className="wave"></div>
			  <div className="wave"></div>
			  <div className="wave"></div>
			  <div className="wave"></div>
			</div>
			</> : (
				<div className='tc'>
					<h1 className="f1">RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots}/>
					</ErrorBoundary>
					</Scroll>
				</div>
			);
		}
	}

export default App;
