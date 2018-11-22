import React, { Component } from 'react';
import './Home.css';
import WorkflowTemplateEditor from './workflowTemplateEditor/WorkflowTemplateEditor';

class Home extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
			workflowObj : {
				"type": "TEMPLATE",
				"active": true,
				"_id": "5b642b88a5c66cc9e9db8b47",
				"code": "test2",
				"name": "RomaTestWorkflowTemplate2",
				"description": "RomaTestWorkflowTemplate2Description",
				"createdBy": "Roman",
				"modelUI": {
					"id": 'afb3ca99-fc18-4bb1-bc13-66e37090b3b9',
					"workflowData": [
					/*	{
							id: '1',
							name: 'Message Block',
							attribute: {
								bgcolor: '#a6de89',
							},
							position: {
								row: 0,
								col: 0,
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
							name: 'Message Block',
							attribute: {
								bgcolor: '#a6de89',
							},
							position: {
								row: 1,
								col: 0,
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
					*/],
				},
				"nodes": "",
				"createdAt": "2018-08-03T10:16:40.211Z",
				"updatedAt": "2018-08-24T17:40:07.907Z",
				"__v": 0
			},

/*
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
            ]*/
    }
  }

	render() {
		//const workflowNodes = this.state.nodes;
		const workflow = this.state.workflowObj;
		return (
			<div>
				<h2 className="header">NEW WORKFLOW TEMPLATE</h2>
				<WorkflowTemplateEditor workflow={workflow}></WorkflowTemplateEditor>
			</div>
		);
	}
}

export default Home;
