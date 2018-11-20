import React, { Component } from 'react';

class WorkflowProperties extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render(){
		const props = this.props.workflowItem;
		return (<div>Workflow Properties Item{
			props.workflowItem
		}</div>);
	};
}

export default WorkflowProperties;
