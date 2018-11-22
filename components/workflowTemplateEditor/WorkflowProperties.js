import React, { Component } from 'react';

class WorkflowProperties extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workflowItem: {},
			value: '0',
			selectedItem: '0'
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		console.log('eeeeeeeeeeee');

		//const propertiesValues = workflowItem.properties;
	}

	handleChange(event) {
		console.log('Handle Change');
		this.props.onSetWorkflowProperties(event.target.value);
		this.setState({ selectedItem: event.target.value });
	}

	getPropertiesValueSelect = (propertiesSelect) => {
		if (propertiesSelect !== undefined) {
			let arrayValues = propertiesSelect[0].value
			let selectedItem = propertiesSelect[0].selected
			console.log('******* selected: ', selectedItem)
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

	saveWorkflow = () => {
	//	const workflowItem = this.props.workflowItem;
		this.props.onSetWorkflowProperties(this.state.selectedItem);
	}

	render() {
		const workflowItem = this.props.workflowItem;
		const propertiesValues = workflowItem.properties;
		console.log('PROPERTIES', propertiesValues);
		console.log('value Selected:', this.state.value);
		console.log('PROPERTIES STATE', this.state.workflowItem);

		return (<div>
			<div>Name:{workflowItem.name}</div>
			<div>
				{this.getPropertiesValueSelect(propertiesValues)}
			</div>
			<div>
				<button onClick={this.saveWorkflow}>Save Changes</button>
			</div>
		</div>);
	};
}

export default WorkflowProperties;
