import React, { Component } from 'react';

class WorkflowProperties extends Component {
	constructor(props) {
		super(props);
    this.state = {value: '0'};
    this.handleChange = this.handleChange.bind(this);
	}


	handleChange(event) {
    this.setState({value: event.target.value});
	}
	
	getPropertiesValueSelect = (propertiesSelect) => {
		if (propertiesSelect!== undefined) {
			let arrayValues = propertiesSelect[0].value
			let selectedItem = propertiesSelect[0].selected
			let children = []
			console.log('******* selected: ',selectedItem)
			arrayValues.forEach(element => {
				children.push(
					<option 
						key={element.id} 
						value={element.id}
						selected={true}
						>
						{element.name}
					</option>)
			})
			
			return (
				
				<select 
					defaultValue={this.state.value}
					/*onChange={this.handleChange}*/
					value={this.state.value} 
					onChange={this.handleChange}
					>
					{children}
				</select>)
		}
	}

	saveWorkflow = () => {
		console.log('saveWorkflow');
	}

	render(){
		const workflowItem = this.props.workflowItem;
		const propertiesValues = workflowItem.properties;
		
		console.log('PROPERTIES',propertiesValues);
		console.log('value Selected:',this.state.value);

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
