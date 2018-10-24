import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: [
                {name:"Module",category:"blocks", bgcolor: "yellow", child: ["left","right","down"]},
                {name:"Assessment", category:"blocks", bgcolor:"pink", child: ["left","right","down"]},
                {name:"Simulation", category:"blocks", bgcolor:"skyblue", child: ["left","right","down"]},
                {name:"Decision", category:"blocks", bgcolor:"orange", child: ["left","right","down"]}
            ],
            workflowConfig:{
                maxRow: 10,
                maxCol: 10,
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
        console.log('dragstart:');
        ev.dataTransfer.setData("id", id);
    }

    setPositionWorkflow = (elem, positionRow, positionCol) => {  
        console.log('onDrop Table'+ elem +' positionRow:'+positionRow+' positionCol:'+positionCol);
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
        console.log('onDragOver Table: ');
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
                console.log('>>>>>>>>>>>>>', item.name, ' i:',i,' j:',j);
                workflowName = item.name;
            }
        });
        return workflowName;
    }

    getDraggable = (i, j) => {
        let itemDraggable = false;
        this.state.workflowDataDraggable.forEach((item) => {
            if ((item.row === i)&&(item.col === j)) {
                console.log('>>>>>>>>>>>>>', item.name, ' i:',i,' j:',j);
                itemDraggable = true;
            }
        });
        return itemDraggable;
    }

    createTable = () => {
        let table = []
        let itemName = ''
        let itemDraggable = false
        for (let i = 0; i < this.state.workflowConfig.maxRow; i++) {
            let children = []
            for (let j = 0; j < this.state.workflowConfig.maxCol; j++) {
                itemName = this.getBlock(i,j)
                itemDraggable = this.getDraggable(i,j)

                if(itemName!=='') {
                    children.push(<td key={j}>{itemName}</td>)
                }
                else {
                    if (itemDraggable===true) {
                        console.log('itemDraggable: i:', i,' j:', j);
                        children.push(
                            <td key={j}
                                onDragOver={(e)=>this.onDragOver(e)}
                                draggable
                                onDrop={(e)=>{this.onDrop(e, i, j )}}
                                
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
                <div className="container-drag">
                    <div className="blocks">
                        <span className="task-header">BLOCKS</span>
                        {this.state.blocks.map(block => {
                            return (<div id={block.name} key={block.name}
                                        onDragStart = {(e) => this.onDragStart(e, block.name)}
                                        draggable
                                        style = {{backgroundColor: block.bgcolor}}
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
                    <div className="properties">
                        Properties
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
