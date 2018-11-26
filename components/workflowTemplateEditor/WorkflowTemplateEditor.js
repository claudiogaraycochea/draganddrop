import React, { Component } from 'react';
import './WorkflowTemplateEditor.css';
import WorkflowProperties from './WorkflowProperties';

class WorkflowTemplateEditor extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			blocks: [
				{
					id: '1',
					name: 'Message',
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
							},
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
								name: 'static',
							},
							{
								id: 1,
								name: 'simulation' 
							},
							{
								id: 2,
								name: 'adaptive'
							}
						],
						selected: '0',
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
			workflowData: [],
			workflowDataDraggable: [],
			workflowItemSelectedId: 0
		}
		this.handleSave = this.handleSave.bind(this);
	}

    setWorkflowItemProperties = (value) => {
		/*let workflowData = this.state.workflowData;
		for(let i=0; i<workflowData.length; i++){
			if(workflowData[i].id===this.state.workflowItemSelectedId) {
				console.log('IIIII',workflowData[i].id,' -> ' ,workflowData[i].properties);
				workflowData[i].properties[0].selected = value; 
			}
		}
		this.setState({
			workflowData
		})*/
		let properties = this.state.workflowData[0].properties[0];
		
		//let workflowData = this.state.workflowData;
		/**/
		
		properties.selected = value;
		/*for(let i=0; i<workflowData.length; i++){
			if(workflowData[i].id===this.state.workflowItemSelectedId) {
				workflowData[i].properties = properties;
				console.log('UUUUUUU:',workflowData[i].id,' -> ' ,workflowData[i].properties);
			}
		}
		console.log('????????????????????',properties);*/
		console.log('$$$$$$$$$$$$$$$',properties);
		//workflowData[0].properties[0].selected = value;
		


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
		ev.dataTransfer.setData("blockId", blockId);
	}

	onDragOver = (ev) => {
		ev.preventDefault();
	}

	/* When is Drop insert the Block */
	onDrop = (ev, row, col) => {
		let blockId = ev.dataTransfer.getData("blockId");
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
		let workflowDataDraggable = this.state.workflowDataDraggable;
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
			properties: item.properties,
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
	setWorkflowItemSelectedId = (workflowItemId) => {
		let workflowItemSelectedId = workflowItemId;
		this.setState({
			workflowItemSelectedId,
		});
	}

	getWorkflowItemProperties = () => {
		let workflowItemSelectedId = this.state.workflowItemSelectedId;
		let workflowItem = {};
		if(workflowItemSelectedId>0){
			this.state.workflowData.forEach((item) => {
				if (item.id === workflowItemSelectedId) {
					workflowItem = item;
				}
			});
			return workflowItem;			
		}
		return '';
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
							onClick={()=>{this.setWorkflowItemSelectedId(workflowItemId)}}>
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

	handleSave = (event) => {
        event.preventDefault();
        
        let workflow = this.props.workflow;
        workflow.modelUI.workflowData=this.state.workflowData;
        
        let workflowDef = {
            code: workflow.code,
            name: workflow.name,
            description: workflow.description,
            createdBy: workflow.createdBy,
            modelUI: workflow.modelUI,
            nodes: []
        };

        if(workflow._id)
            workflowDef._id = workflow._id;
        
        console.log('%%%%%%%%%%%%%%%%%%%%% save workflowDef', workflowDef);
    
        //this.props.saveWorkflow(workflowDef);
	}

	render() {
		console.log(this.state.workflowData);
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
									{block.name}
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
							<WorkflowProperties 
								workflowItemId={this.state.workflowItemSelectedId}
								workflowItem = {this.getWorkflowItemProperties()}
								onSetWorkflowProperties={this.setWorkflowItemProperties}
								>
							</WorkflowProperties>
						</div>
						<div>
							<button onClick={this.handleSave}>Save</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default WorkflowTemplateEditor;
