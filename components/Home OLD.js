import React, { Component } from 'react';
import './Home.css';

class Home extends Component {

    state = {
        blocks: [
            {name:"Module",category:"blocks", bgcolor: "yellow", child: ["left","right","down"]},
            {name:"Assesment", category:"blocks", bgcolor:"pink", child: ["left","right","down"]},
            {name:"Simulation", category:"blocks", bgcolor:"skyblue", child: ["left","right","down"]},
            {name:"Desisions", category:"blocks", bgcolor:"skyblue", child: ["left","right","down"]}
        ],
        tasks: [
            {name:"Module",category:"blocks", bgcolor: "yellow", child: ["left","right","down"]},
            {name:"Assesment", category:"blocks", bgcolor:"pink", child: ["left","right","down"]},
            {name:"Simulation", category:"blocks", bgcolor:"skyblue", child: ["left","right","down"]}
        ],
        matrix: [],
        matrixMaxX: 3,
        matrixMaxY: 3,
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
        ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:');
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        console.log('onDragOver: ');
        ev.preventDefault();
    }

    onDrop = (ev, cat) => { 
        let id = ev.dataTransfer.getData("id");
        console.log('onDrop'+id);
        /*let tasks = this.state.tasks.filter((task) => {
            if (task.name === id) {
                task.category = cat;
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks
        });*/
    }

    buildMatrixXY = () => {
        function onDragOver(ev) {
            console.log('onDragOver Table: ');
            ev.preventDefault();
        }

        function onDrop(ev, positionRC) {
            let elem = ev.dataTransfer.getData("id");
            console.log('onDrop Table'+ elem +' position:'+positionRC);
  
/*
            let tasks = this.state.tasks.filter((task) => {
                if (task.name === id) {
                    task.category = cat;
                }
                return task;
            });
    
            this.setState({
                ...this.state,
                tasks
            });*/
        }

        let elements = '';
        let rows = this.state.cells.map(function (item, i){
            elements = item.map(function (element,j){
                let classCell = `cell_`+i+`_`+j;
                let positionRC = i+`-`+ j; 
                return (
                    <td key={j} className={classCell}>
                        <div id={element.name} key={element.name}
                                onDragOver={(e)=>onDragOver(e)}
                                draggable
                                onDrop={(e)=>{onDrop(e, positionRC)}}
                            >
                            {element.name} ({i} {j})
                        </div>
                    </td>
                );
            });

            return (
                <tr className="classTR" key={i}>{elements}</tr>
            );

        });
        
        return (
            <div>
                <table className="table-hover table-striped table-bordered">
                    <tbody>
                        {rows}
                    </tbody>
                </table>                               
            </div>

        );
    }

    render() {

        var tasks = {
            blocks: [],
            workflow: []
        }
        
        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
                <div key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style = {{backgroundColor: t.bgcolor}}
                >
                    {t.name}
                </div>
            );
        });
        let i=-1;
        let j=0;
        
        this.state.cells.forEach((row)=>{
            i++;
            j=-1;
            row.forEach((col) => {
                j++;
                console.log('col:'+col.name+' '+i+'_'+j);
            });
        });

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
                                        onDrop={(e)=>{this.onDrop(e, "blocks")}}
                                        style = {{backgroundColor: block.bgcolor}}
                                    >
                                        {block.name}
                                    </div>
                                    )
                            })
                        }
                    </div>
                    <div className="workflow" 
                        onDragOver={(e)=>this.onDragOver(e)}
                        onDrop={(e)=>this.onDrop(e, "workflow")}>
                        <span className="task-header">WORKFLOW</span>
                        {tasks.workflow}
                    </div>
                    <div className="workflow-wrapper">
                        Content
                        <div>{this.buildMatrixXY()}</div>
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
