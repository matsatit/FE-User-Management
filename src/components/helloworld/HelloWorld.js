import React, { Component } from "react";
import styles from './helloworld.scss';

class HelloWorld extends Component {
	render() {
		return (
			<div className={styles.helloworld}>Hello World!</div>
		);
	}
}

export default HelloWorld;
