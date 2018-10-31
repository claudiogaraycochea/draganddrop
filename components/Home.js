import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: [
                {   
                    name: 'Module', 
                    attribute: {
                        bgcolor: '#8decaf',
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
                        bgcolor: '#83ccff',
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
                        bgcolor: '#f5d47c',
                    },
                    property: {
                        childDirection: ['left']
                    }
                }
            ],
            workflowConfig:{
                maxRow: 10,
                maxCol: 10,
            },
            workflowData: [
                /*{
                    name:'Module', 
                    row: 0, 
                    col: 1, 
                    property: {
                        'module': ''
                    }
                },
                {name:'Assessment', row: 2, col: 0}*/
            ],
            workflowDataDraggable: [
                {name:'', row: 0, col: 0}
            ],
        }
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

    insertPositionWorkflowDraggableLeft = (positionRow, positionCol) => {
        let workflowDataDraggable = this.state.workflowDataDraggable;
        let itemDraggable = {};
        let positionRowNext = positionRow+1;
        itemDraggable = {
            name: '',
            row: positionRowNext,
            col: positionCol
        }
        workflowDataDraggable.push(itemDraggable);
    }

    insertPositionWorkflowDraggableHaveDecision = (positionRow, positionCol) => {
        /* Verify if the Row have Decision */
        let workflowData = this.state.workflowData;
        let result = false;
        workflowData.forEach((item) => {
            if(item.name==='Decision'){
                result = true;
            }
        });
        return result;
    }

    insertPositionWorkflowDraggableDown = (positionRow, positionCol) => {
        let workflowDataDraggable = this.state.workflowDataDraggable;
        let itemDraggable = {};
        let positionColNext = positionCol+1;

        itemDraggable = {
            name: '',
            row: positionRow,
            col: positionColNext
        }
        workflowDataDraggable.push(itemDraggable);

        if(this.insertPositionWorkflowDraggableHaveDecision(positionRow, positionCol)===true) {
            this.insertPositionWorkflowDraggableLeft(positionRow, positionCol);
        }
    }

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

    /* Get a Block */
    getWorkflowItemByPosition = (i, j) => {
        let workflowItemName = '';
        this.state.workflowData.forEach((item) => {
            if ((item.row === i)&&(item.col === j)) {
                workflowItemName = item.name;
                console.log('*************getBlock:',item);
            }
        });
        return workflowItemName;
    }

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
    getDraggable = (i, j) => {
        let itemDraggable = false;
        this.state.workflowDataDraggable.forEach((item) => {
            if ((item.row === i)&&(item.col === j)) {
                itemDraggable = true;
            }
        });
        return itemDraggable;
    }

    createContentTable = () => {
        let table = []
        let itemName = ''
        let itemDraggable = false
        let blockProperty = ''
        for (let i = 0; i < this.state.workflowConfig.maxRow; i++) {
            let children = []
            for (let j = 0; j < this.state.workflowConfig.maxCol; j++) {
                /* Get Block for include in the cell*/
                itemName = this.getWorkflowItemByPosition(i,j)
                /* If is Draggable return true */ 
                itemDraggable = this.getDraggable(i,j)
                
                if(itemName!=='') {
                    blockProperty = this.getBlockProperty(itemName);
                    console.log(blockProperty);
                    children.push(<td key={j} draggable style={{backgroundColor: `${blockProperty.attribute.bgcolor}`}}>{itemName}</td>)
                }
                else {
                    if (itemDraggable===true) {
                        children.push(
                            <td key={j}
                                onDragOver={(e)=>this.onDragOver(e)}
                                onDrop={(e)=>{this.onDrop(e, i, j)}}
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

    render() {
        return (
            <div>
                <h2 className="header">NEW WORKFLOW TEMPLATE</h2> 
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
                        <div>{this.createTable()}</div>
                    </div>
                    <div className="properties-wrapper">
                        <span className="task-header">PROPERTIES</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
