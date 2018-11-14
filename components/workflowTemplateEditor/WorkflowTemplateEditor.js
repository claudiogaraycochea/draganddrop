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
                    name: 'Module', 
                    attribute: {
                        bgcolor: '#a6de89',
                    },
                    property: {
                        status: false,
                        childDirection: ['down'],
                        module: [
                            {'name': 'select1' },
                            {'name': 'select2' },
                        ]
                    }
                },
                {
                    name: 'Assessment',                     
                    attribute: {
                        bgcolor: '#ff7d79',
                    },
                    property: {
                        status: false,
                        childDirection: ['down'],
                        module: [
                            {'name': 'select3' },
                            {'name': 'select4' },
                        ]
                    }
                },
                {
                    name: 'Simulation',                     
                    attribute: {
                        bgcolor: '#71aee2',
                    },
                    property: {
                        status: false,
                        childDirection: ['down'],
                        module: [
                            {'name': 'select5' },
                            {'name': 'select6' },
                        ]
                    }
                },
                {
                    name: 'Decision',                    
                    attribute: {
                        bgcolor: '#fbd15b',
                    },
                    property: {
                        childDirection: ['left']
                    }
                }
            ],
            workflowConfig:{
                maxRow: 50,
                maxCol: 50,
            },
            workflowData: [
                /*{
                    id: '',
                    name:'Module', 
                    row: 0, 
                    col: 1, 
                    property: {
                        'module': ''
                    },
                    node: {}

                },
                {
                    id: '',
                    name:'Module', 
                    row: 0, 
                    col: 1, 
                    property: {
                        'module': ''
                    },
                    node: {}

                },
                */
            ],
            workflowDataDraggable: [
                {name:'', row: 0, col: 0}
            ],
            workflowItemSelectedId: 0
        }
    }

    componentDidMount(){
        let workflowData = this.state.workflowData;
        //let count = 0;
        let nodes = this.props.workflow.modelUI.workflowData;
        console.log(workflowData);
        let workflow = this.props.workflow;
        console.log(workflow);
        let i = 0;
        let elemId = 'Module';
        let positionRow = 0;
        let positionCol = 0;
        nodes.forEach((nodeItem)=>{
            //count = workflowData.length+1;
            let item = {
                id: nodeItem.id,
                name: nodeItem.name,
                row: nodeItem.row,
                col: nodeItem.col,
                property: {},
                node: {},
            }
            workflowData.push(item); 
            i++;
            positionRow=i;
        });
        positionRow--;
        
        this.insertPositionWorkflowDraggable(elemId, positionRow, positionCol);

        this.setState(
            workflowData
        )
    }

    /* When start to Drag set a Block name as ID */
    onDragStart = (ev, id) => {
        console.log('onDragStart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    /* When is Drop insert the Block */
    onDrop = (ev, positionRow, positionCol) => {
        let elemId = ev.dataTransfer.getData("id");
        this.insertBlockToWorkflow(elemId,positionRow,positionCol);
    }

    /* 
        DRAGGABLE AREA
    */

    /* Insert a position Draggable in a Workflow */
    insertPositionWorkflowDraggable = (elemId, positionRow, positionCol) => {
        let itemBlock = this.getBlockProperty(elemId);
        
        itemBlock.property.childDirection.forEach((item) => {
            if(item==='left'){
                this.insertPositionWorkflowDraggableLeft(positionRow,positionCol);
            }
            if(item==='down') {
                this.insertPositionWorkflowDraggableDown(positionRow,positionCol);
            }
        });
    }
    
    /* Insert a position Draggable 1 cell left */
    insertPositionWorkflowDraggableLeft = (positionRow, positionCol) => {
        let workflowDataDraggable = this.state.workflowDataDraggable;
        let itemDraggable = {};
        let positionColNext = positionCol+1;
        itemDraggable = {
            name: '',
            row: positionRow,
            col: positionColNext
        }
        workflowDataDraggable.push(itemDraggable);
    }

    /* Insert a position Draggable 1 cell down & do a exception with Decision */
    insertPositionWorkflowDraggableDown = (positionRow, positionCol) => {
        let workflowDataDraggable = this.state.workflowDataDraggable;
        let itemDraggable = {};
        let positionRowNext = positionRow+1;

        itemDraggable = {
            name: '',
            row: positionRowNext,
            col: positionCol
        }
        workflowDataDraggable.push(itemDraggable);

        if(this.positionWorkflowDraggableHaveDecision(positionRow, positionCol)===true) {
            this.insertPositionWorkflowDraggableLeft(positionRow, positionCol);
        }
    }

    /* Verify if the position have Decision */
    positionWorkflowDraggableHaveDecision = (positionRow, positionCol) => {
        /* Verify if the Row have Decision */
        let workflowData = this.state.workflowData;
        let result = false;
        console.log('positionWorkflowDraggableHaveDecision: > positionRow ',positionCol);
        workflowData.forEach((item) => {
            if(positionRow===item.row) {
                if(item.name==='Decision'){
                    result = true;
                }
            }
        });
        return result;
    }

    /* Insert a Block in a Workflow */
    insertBlockToWorkflow = (elemId, positionRow, positionCol) => {
        let workflowData = this.state.workflowData;
        let count = workflowData.length+1;
        /* Set a element on the workflow array */
        let item = {
            id: count,
            name: elemId,
            row: positionRow,
            col: positionCol,
            property: {}
        }

        workflowData.push(item);        
        
        /* Set a draggable */
        this.insertPositionWorkflowDraggable(elemId, positionRow, positionCol);

        this.setState(
            workflowData
        )
    }

    /* Get a WorkflowItem from a position */
    getWorkflowItemByPosition = (tableRow, tableCol) => {
        let workflowItem = {};
        this.state.workflowData.forEach((item) => {
            if ((item.row === tableRow)&&(item.col === tableCol)) {
                workflowItem = item;
            }
        });
        return workflowItem;
    }

    /* Get a property from a Block */
    getBlockProperty = (itemName) => {
        let itemResult = {name:'',bgcolor:''};
        this.state.blocks.forEach((item) => {
            if (item.name === itemName) {
                //console.log(item.attribute.bgcolor)
                itemResult=item
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
        let blockProperty = ''
        
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
                    blockProperty = this.getBlockProperty(workflowItem.name);
                    children.push(
                        <td 
                            key={j}
                            style={{backgroundColor: `${blockProperty.attribute.bgcolor}`}} 
                            workflowid={workflowItem.id}
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
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="blocks-wrapper">
                        <span className="task-header">BLOCKS</span>
                        {this.state.blocks.map(block => {
                            return (<div id={block.name} key={block.name}
                                        onDragStart = {(e) => this.onDragStart(e, block.name)}
                                        draggable
                                        className="itemBlock"
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
