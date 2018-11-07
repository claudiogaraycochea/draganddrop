import React, { Component } from 'react';
import './Home.css';
import WorkflowTemplateEditor from './workflowTemplateEditor/WorkflowTemplateEditor';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [
                {
                  "onRun": [],
                  "type": "MODULE",
                  "root": true,
                  "last": false,
                  "nextNodesOnSuccess": [
                    {
                      "conditions": [],
                      "nextNodeId": 2
                    }
                  ],
                  "id": 1,
                  "name": "5b3685c961668b1243dc1493",
                  "description": "module",
                  "type_id": "5b3685c961668b1243dc1493",
                  "subType": "greetings"
                },
                {
                  "onRun": [],
                  "type": "ASSESSMENT",
                  "root": false,
                  "last": false,
                  "nextNodesOnSuccess": [
                    {
                      "conditions": [],
                      "nextNodeId": 3
                    }
                  ],
                  "id": 2,
                  "name": "5ace65e1539ec1619dcc48e7",
                  "description": "assessment",
                  "type_id": "5ace65e1539ec1619dcc48e7",
                  "subType": "assessment"
                },
                {
                  "onRun": [],
                  "type": "MODULE",
                  "root": false,
                  "last": true,
                  "nextNodesOnSuccess": [],
                  "id": 3,
                  "name": "5b59da2ee7cca06197a166f2",
                  "description": "module",
                  "type_id": "5b59da2ee7cca06197a166f2",
                  "subType": "end"
                }
            ]
        }
    }

    render() {
        const workflowNodes = this.state.nodes;
        return (
            <div>
                <h2 className="header">NEW WORKFLOW TEMPLATE</h2> 
                <WorkflowTemplateEditor nodes={workflowNodes}></WorkflowTemplateEditor>
            </div>
        );
    }
}

export default Home;
