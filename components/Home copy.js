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
            cells: [
                [
                    {name:"Name 1",child:"d,r,l"},
                    {name:"Name 2",child:"d,r,l"},
                    {name:"Name 3",child:"d,r,l"},
                    {name:"Name 3",child:"d,r,l"},
                ],
                [                
                    {name:"Name 4",child:"d,r,l"},
                    {name:"Name 5",child:"d,r,l"},
                    {name:"Name 6",child:"d,r,l"},
                ]
            ],
            testState: 'jjjjjjjj',
        }
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:');
        ev.dataTransfer.setData("id", id);
    }

    setPositionWorkflow = (elem, positionRow, positionCol) => {  
        console.log('onDrop Table'+ elem +' positionRow:'+positionRow+' positionCol:'+positionCol);
        console.log('state:',this.state.testState);
    }

    onDragOver = (ev) => {
        console.log('onDragOver Table: ');
        ev.preventDefault();
    }

    onDrop = (ev, positionRow, positionCol) => {
        let elem = ev.dataTransfer.getData("id");
        console.log('onDrop',elem);
        this.setPositionWorkflow(elem,positionRow,positionCol);
    }

    showRow = (item, i) => {
        var tasks = [];
        let j = -1;
        item.forEach ((element) => {
            j++;
            tasks.push(<td key={j}>
                <div id={element.name} key={element.name}
                        onDragOver={(e)=>this.onDragOver(e)}
                        draggable
                        onDrop={(e)=>{this.onDrop(e, i, j)}}
                    >
                    {element.name} ({i} {j})
                </div>
            </td>)
        });
        return tasks;
    }

    buildWorkflow = () => {
        return (
            <div>
                <table className="table-hover table-striped table-bordered">
                    <tbody>
                    {this.state.cells.map((item, i) => {
                            console.log('**************'+item);
                            return (<tr key={i}>{this.showRow(item,i)}</tr>)
                        })
                    }
                    </tbody>
                </table>                               
            </div>

        );
    }

    render() {
        let workflow = this.buildWorkflow();
        return (
            <div>
                <h2 className="header">WORKFLOW</h2> 
                <div className="container-drag">
                    <div className="blocks">
                        <span className="task-header">BLOCKS (STATICS)</span>
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
                        Content
                        <div>{workflow}</div>
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
