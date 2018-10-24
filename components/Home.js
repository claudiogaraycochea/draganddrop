import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: [
                {   
                    name:"Module", 
                    attribute: {
                        bgcolor: "#8decaf", 
                        child: ["left","right","down"]
                    },
                    property: {}
                },
                {
                    name:"Assessment",                     
                    attribute: {
                        bgcolor: "#ff7d79", 
                        child: ["left","right","down"]
                    },
                    property: {}
                },
                {
                    name:"Simulation",                     
                    attribute: {
                        bgcolor: "#83ccff", 
                        child: ["left","right","down"]
                    },
                    property: {}
                },
                {
                    name:"Decision",                    
                    attribute: {
                        bgcolor: "#f5d47c", 
                        child: ["left","right","down"]
                    },
                    property: {}
                }
            ],
            workflowConfig:{
                maxRow: 5,
                maxCol: 6,
            },
            workflowData: [
                /*{name:'Module', row: 0, col: 1},
                {name:'Assessment', row: 2, col: 0}*/
            ],
            workflowDataDraggable: [
                {name:'', row: 0, col: 0}
            ],
        }
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    setPositionWorkflow = (elem, positionRow, positionCol) => {  
        let item = {
            name: elem,
            row: positionRow,
            col: positionCol
        }

        let workflowData = this.state.workflowData;
        workflowData.push(item);        
        
        let workflowDataDraggable = this.state.workflowDataDraggable;
        
        let positionColNext = positionCol+1;
        let itemDraggable = {
            name: '',
            row: positionRow,
            col: positionColNext
        }
        workflowDataDraggable.push(itemDraggable);
        let positionRowNext = positionRow+1;
        itemDraggable = {
            name: '',
            row: positionRowNext,
            col: positionCol
        }
        workflowDataDraggable.push(itemDraggable);
        this.setState(
            workflowData
        )
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, positionRow, positionCol) => {
        let elem = ev.dataTransfer.getData("id");
        this.setPositionWorkflow(elem,positionRow,positionCol);
    }

    getBlock = (i, j) => {
        let workflowName = '';
        this.state.workflowData.forEach((item) => {
            if ((item.row === i)&&(item.col === j)) {
                workflowName = item.name;
            }
        });
        return workflowName;
    }

    getDraggable = (i, j) => {
        let itemDraggable = false;
        this.state.workflowDataDraggable.forEach((item) => {
            if ((item.row === i)&&(item.col === j)) {
                itemDraggable = true;
            }
        });
        return itemDraggable;
    }

    getBlockProperty = (itemName) => {
        let itemResult = {name:'',bgcolor:''};
        this.state.blocks.forEach((item) => {
            if (item.name === itemName) {
                console.log(item.attribute.bgcolor)
                itemResult=item
            }
        });
        return itemResult;
    }

    createTable = () => {
        let table = []
        let itemName = ''
        let itemDraggable = false
        let blockProperty = ''
        for (let i = 0; i < this.state.workflowConfig.maxRow; i++) {
            let children = []
            for (let j = 0; j < this.state.workflowConfig.maxCol; j++) {
                itemName = this.getBlock(i,j)
                itemDraggable = this.getDraggable(i,j)
                if(itemName!=='') {
                    blockProperty = this.getBlockProperty(itemName);
                    children.push(<td key={j} style={{backgroundColor: `${blockProperty.attribute.bgcolor}`}}>{itemName}</td>)
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

    drawTable = () => {
        return(
            <table>
                <tbody>
                    {this.createTable()}
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
                        <div>{this.drawTable()}</div>
                    </div>
                    <div className="properties-wrapper">
                        PROPERTIES
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
