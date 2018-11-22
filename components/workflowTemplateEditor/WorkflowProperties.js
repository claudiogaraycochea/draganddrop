import React, { Component } from 'react';

class WorkflowProperties extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		this.handleOnChange = this.handleOnChange.bind(this);
	}

  handleOnChange(event, data) {
    /*let { form, valid } = this.state;
    form[data.name] = data.value;
    if(!_.isEmpty(data.value)) valid[data.name] = false;
    this.setState({
      form, valid
    });*/
	}

	getPropertiesValueSelect = (propertiesSelect) => {
		let children = [];
		if (propertiesSelect!== undefined) {
			let arrayValues = propertiesSelect[0].value;
			arrayValues.forEach(element => {
				children.push(<option key={element.id}>{element.name}</option>);
			});
			return (<select 
				onClick={this.getPropertiesValueSelected}>{children}
				</select>)
		}
	}

	render(){
		const workflowItem = this.props.workflowItem;
		const propertiesValues = workflowItem.properties;
		console.log('PROPERTIES',propertiesValues);
		
		return (<div>
				<div>Name:{workflowItem.name}</div>
				<div>
					{this.getPropertiesValueSelect(propertiesValues)}
				</div>
			</div>);
	};
}

export default WorkflowProperties;
