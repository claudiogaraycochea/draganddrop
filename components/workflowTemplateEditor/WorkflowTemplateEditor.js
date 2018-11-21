import React, { Component } from 'react';
import './WorkflowTemplateEditor.css';
import WorkflowProperties from './WorkflowProperties';

/*class Properties extends Component {
	
	render(){
		const props = this.props.workflowItem;
		return (<div>Item{
			props.workflowItem
		}</div>);
	};
}*/

class WorkflowTemplateEditor extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			blocks: [
				{
					id: '1',
					name: 'Message Block',
					attribute: {
						bgcolor: '#a6de89',
					},
					position: {
						row: '',
						col: '',
					},
					childDirection: 'down',
					properties: [{
						name: 'type',
						value:[
							{
								id: 0,
								name: 'greetings',
							},
							{
								id: 1,
								name: 'end' 
							}
						],
						selected: '1'
					}]
				},
				{
					id: '2',
					name: 'Assessment',
					attribute: {
						bgcolor: '#ff7d79',
					},
					position: {
						row: '',
						col: '',
					},
					childDirection: 'down',
					properties: [{
						name: 'type',
						value:[
							{
								id: 0,
								name: 'greetings',
							},
							{
								id: 1,
								name: 'end' 
							}
						],
						selected: '',
					}]
				},
				{
					id: '3',
					name: 'Decision',
					attribute: {
						bgcolor: '#fbd15b',
					},
					position: {
						row: '',
						col: '',
					},
					childDirection: 'left',
					properties: [{
						name: 'type',
						value:[
							{
								id: 0,
								name: 'greetings',
							},
							{
								id: 1,
								name: 'end' 
							}
						],
						selected: '',
					}]
				}
			],
			workflowConfig:{
				maxRow: 20,
				maxCol: 20,
			},
			workflowData: [
				// Arraw block objects
			],
			workflowDataDraggable: [],
			workflowItemSelectedId: 0
		}
	}

	componentDidMount(){
		let workflowData = this.state.workflowData;
		let nodes = this.props.workflow.modelUI.workflowData;
		let workflowDataDraggable = [];
		nodes.forEach((nodeItem)=>{
			workflowData.push(nodeItem);
		});
		workflowDataDraggable = this.buildWorkflowDraggableAreas(workflowData);
		this.setState({
			workflowData,
			workflowDataDraggable			
		});
	}

	/* When start to Drag set a Block name as ID */
	onDragStart = (ev, blockId) => {
		console.log('onDragStart:',blockId);
		ev.dataTransfer.setData("blockId", blockId);
	}

	onDragOver = (ev) => {
		ev.preventDefault();
	}

	/* When is Drop insert the Block */
	onDrop = (ev, row, col) => {
		let blockId = ev.dataTransfer.getData("blockId");
		console.log('onDrop: ',blockId);
		this.insertBlockToWorkflow(blockId,row,col);
	}

	/* 
		DRAGGABLE AREA
	*/

	isWorkflowPostionEmpty = (workflowData, row, col) => {
		let existItem = true;
		workflowData.forEach((item) => {
			if((item.position.row===row)&&(item.position.col===col)) {
				existItem = false;
			}
		});
		return existItem;
	}

	buildWorkflowDraggableAreas = (workflowData) => {
		let workflowDataDraggable = [];
		workflowData.forEach((item) => {
			if(item.childDirection==='left'){
				if(this.isWorkflowPostionEmpty(workflowData, (item.position.row+1), item.position.col)){
					let itemDraggable = {};
					itemDraggable = {
						row: item.position.row,
						col: (item.position.col+1)
					};
					workflowDataDraggable.push(itemDraggable);
				}
			}
			if(item.childDirection==='down') {
				if(this.isWorkflowPostionEmpty(workflowData, (item.position.row+1), item.position.col)){
					let itemDraggable = {};
					itemDraggable = {
						row: (item.position.row+1),
						col: item.position.col
					};
					workflowDataDraggable.push(itemDraggable);
					if(this.positionWorkflowDraggableHaveDecision(item.position.row, item.position.col)===true) {
						itemDraggable = {
							row: item.position.row,
							col: (item.position.col+1)
						};
						workflowDataDraggable.push(itemDraggable);
					}
				}
			}
		});
		if (workflowData.length===0) {
			let itemDraggable = {};
			itemDraggable = {
				row: 0,
				col: 0
			};
			workflowDataDraggable.push(itemDraggable);
		}
		return workflowDataDraggable;
	}

	/* Verify if the position have Decision */
	positionWorkflowDraggableHaveDecision = (positionRow, positionCol) => {
		/* Verify if the Row have Decision */
		let workflowData = this.state.workflowData;
		let result = false;
		workflowData.forEach((item) => {
			if(positionRow===item.position.row) {
				if(item.name==='Decision'){
					result = true;
				}
			}
		});
		return result;
	}

	/* Insert a Block in a Workflow */
	insertBlockToWorkflow = (blockId, row, col) => {
		let workflowData = this.state.workflowData;
		let workflowDataDraggable = [];
		let count = workflowData.length+1;

		/* Set a element on the workflow array */
		let item = this.getBlock(blockId);
		let obj = {
			id: count.toString(),
			name: item.name,
			attribute: item.attribute,
			position: {
				row: row,
				col: col,
			},
			childDirection: item.childDirection,
			properties: [{
				name: item.properties.name,
				value: item.properties.value,
				selected: '1'
			}]
		}
		workflowData.push(obj);
		workflowDataDraggable = this.buildWorkflowDraggableAreas(workflowData);
		this.setState({
			workflowData,
			workflowDataDraggable			
		});
	}

	/* Get a WorkflowItem from a position */
	getWorkflowItemByPosition = (tableRow, tableCol) => {
		let workflowItem = {};
		this.state.workflowData.forEach((item) => {
			if ((item.position.row === tableRow)&&(item.position.col === tableCol)) {
				workflowItem = item;
			}
		});
		return workflowItem;
	}

	/* Get a property from a Block */
	getBlock = (blockId) => {
		let blocks = this.state.blocks;
		let itemResult = {};
		blocks.forEach((item) => {
			if (item.id === blockId) {
				itemResult = item;
			}
		});
		console.log('fuera del for');
		return itemResult;
	}

	/* Get true if a Cell is draggable */
	getDraggable = (tableRow, tableCol) => {
		let itemDraggable = false;
		this.state.workflowDataDraggable.forEach((item) => {
			if ((item.row === tableRow)&&(item.col === tableCol)) {
				itemDraggable = true;
			}
		});
		return itemDraggable;
	}

	/* Get a property from a Workflow */
	getWorkflowProperty = (workflowItemId) => {
		console.log('getWorkflowItem', workflowItemId);
		let workflowItemSelectedId = workflowItemId;
		this.setState({
			workflowItemSelectedId,
		});
	}

	/* 
		TABLE CREATOR
	*/
	createContentTable = () => {
		let table = []
		let workflowItem = {}
		let itemDraggable = false
		
		for (let i = 0; i < this.state.workflowConfig.maxRow; i++) {
			let children = []
			for (let j = 0; j < this.state.workflowConfig.maxCol; j++) {
				let tableRow = j;
				let tableCol = i;
				/* Get Block for include in the cell*/
				workflowItem = this.getWorkflowItemByPosition(tableRow,tableCol)
				
				/* If is Draggable return true */ 
				itemDraggable = this.getDraggable(tableRow,tableCol)
				if(workflowItem.name !== undefined) {
					let workflowItemId = workflowItem.id;
					children.push(
						<td 
							key={j}
							style={{backgroundColor: `${workflowItem.attribute.bgcolor}`}} 
							onClick={()=>{this.getWorkflowProperty(workflowItemId)}}>
							{workflowItem.name}
						</td>)
				}
				else {
					if (itemDraggable===true) {
						children.push(
							<td key={j}
								onDragOver={(e)=>this.onDragOver(e)}
								onDrop={(e)=>{this.onDrop(e, tableRow, tableCol)}}
							>
								<div className="itemDraggable">Draggable</div> 
							</td>
						)
					}
					else {
						children.push(<td key={j}></td>)
					}
				}
			}
			table.push(<tr key={i}>{children}</tr>)
		}
		return table
	}

	createTable = () => {
		return(
			<table>
				<tbody>
					{this.createContentTable()}
				</tbody>
			</table>
		)
	}

	saveWorkflow = () => {
		console.log('********** save workflow');
		let workflow = this.props.workflow;
		workflow.modelUI.workflowData=this.state.workflowData;
		console.log(workflow);
		console.log('>>>>>>>>>', this.state.workflowDataDraggable);
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="blocks-wrapper">
						<span className="task-header">BLOCKS</span>
						{this.state.blocks.map(block => {
							return (<div id={block.name} key={block.id}
									onDragStart = {(e) => this.onDragStart(e, block.id)}
									draggable
									className = "itemBlock"
									style = {{backgroundColor: block.attribute.bgcolor}}
								>
									{block.name} {block.id}
								</div>
								)
							})
						}
					</div>
					<div className="workflow-wrapper">
						<span className="task-header">WORKFLOW</span>
						<div className="workflow-table">{this.createTable()}</div>
					</div>
					<div className="properties-wrapper">
						<span className="task-header">PROPERTIES</span>
						<div>
							<select>
								<option>Test</option>
							</select>
						</div>
						<div>
							{this.state.workflowItemSelectedId}
							<WorkflowProperties 
								workflowItem={this.state.workflowItemSelectedId}
								//saveWorkflow={saveWorkflow}
								>
							</WorkflowProperties>
							{/*<Properties workflowItem={this.state.workflowItemSelectedId} ></Properties>*/}
						</div>
						<div>
							<button onClick={()=>{this.saveWorkflow()}}>Save Workflow</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WorkflowTemplateEditor;
