import React, { Component } from "react";
import styles from './helloworld.scss';

class HelloWorld extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log("This line should be covered");
	}

	componentWillUnmount() {
		console.log("This line should be covered");
	}

	render() {
		return (
			<div className={styles.helloworld}>Hello World!</div>
		);
	}
}

export default HelloWorld;
