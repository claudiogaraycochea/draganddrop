import React, { Component } from 'react';

class WorkflowProperties extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workflowItem: {},
			selectedItem: '0'
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onSetWorkflowProperties(event.target.value);
		this.setState({ selectedItem: event.target.value });
	}

	getPropertiesValueSelect = (propertiesSelect) => {
		if (propertiesSelect !== undefined) {
			let arrayValues = propertiesSelect[0].value
			//let selectedItem = propertiesSelect[0].selected
			const listItems = arrayValues.map((element) =>
				<option key={element.id} value={element.id} selected={true}>
					{element.name}
				</option>
			);
			return (
				<select
					defaultValue={this.state.value}
					onChange={this.handleChange}
				>
					{listItems}
				</select>
			);
		}
	}

	render() {
		const workflowItem = this.props.workflowItem;
		const propertiesValues = workflowItem.properties;
		return (
			<div>
				<div>Name:{workflowItem.name}</div>
				<div>
					{this.getPropertiesValueSelect(propertiesValues)}
				</div>
			</div>);
	};
}

export default WorkflowProperties;
