// NOTE: Diagrams in this file have been created with https://asciiflow.com/#/
// If you update the tests, please update the diagrams as well.
// If you add a test, please create a new diagram.
//
// Map
// 0  means the output has no run data
// 1  means the output has run data
// â–ºâ–º denotes the node that the user wants to execute to
// XX denotes that the node is disabled
// PD denotes that the node has pinned data

import { NodeConnectionTypes } from 'workflow-automation-workflow';

import { createNodeData } from './helpers';
import { DirectedGraph } from '../directed-graph';
import { filterDisabledNodes } from '../filter-disabled-nodes';

describe('filterDisabledNodes', () => {
	//                     XX
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”       â–ºâ–º
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚        â”‚      â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
	//  â”‚triggerâ”‚         â”‚disabledâ”œâ”€â”€â”€â”€â”€â–ºâ”‚destinationâ”‚
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚        â”‚      â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜         â””â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	// turns into
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”       â–ºâ–º
	//  â”‚       â”‚      â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
	//  â”‚triggerâ”œâ”€â”€â”€â”€â”€â–ºâ”‚destinationâ”‚
	//  â”‚       â”‚      â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜
	test('filter disabled nodes', () => {
		const trigger = createNodeData({ name: 'trigger' });
		const disabled = createNodeData({ name: 'disabled', disabled: true });
		const destination = createNodeData({ name: 'destination' });

		const graph = new DirectedGraph()
			.addNodes(trigger, disabled, destination)
			.addConnections({ from: trigger, to: disabled }, { from: disabled, to: destination });

		const subgraph = filterDisabledNodes(graph);

		expect(subgraph).toEqual(
			new DirectedGraph()
				.addNodes(trigger, destination)
				.addConnections({ from: trigger, to: destination }),
		);
	});

	//                 XX          XX
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
	//  â”‚triggerâ”œâ”€â”€â”€â”€â–ºâ”‚node1â”œâ”€â”€â”€â”€â–ºâ”‚node2â”œâ”€â”€â”€â”€â–ºâ”‚destinationâ”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	// turns into
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
	//  â”‚triggerâ”œâ”€â”€â”€â”€â–ºâ”‚destinationâ”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	test('filter multiple disabled nodes in a row', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const disabledNode1 = createNodeData({ name: 'disabledNode1', disabled: true });
		const disabledNode2 = createNodeData({ name: 'disabledNode2', disabled: true });
		const destination = createNodeData({ name: 'destination' });

		const graph = new DirectedGraph()
			.addNodes(trigger, disabledNode1, disabledNode2, destination)
			.addConnections(
				{ from: trigger, to: disabledNode1 },
				{ from: disabledNode1, to: disabledNode2 },
				{ from: disabledNode2, to: destination },
			);

		// ACT
		const subgraph = filterDisabledNodes(graph);

		// ASSERT
		expect(subgraph).toEqual(
			new DirectedGraph()
				.addNodes(trigger, destination)
				.addConnections({ from: trigger, to: destination }),
		);
	});

	describe('root nodes', () => {
		//              XX
		//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
		//  â”‚triggerâ”œâ”€â”€â”€â–ºrootâ”œâ”€â”€â”€â–ºdestinationâ”‚
		//  â””â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â–²â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		//                 â”‚AiLanguageModel
		//                â”Œâ”´â”€â”€â”€â”€â”€â”€â”
		//                â”‚aiModelâ”‚
		//                â””â”€â”€â”€â”€â”€â”€â”€â”˜
		// turns into
		//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”            â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
		//  â”‚triggerâ”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–ºdestinationâ”‚
		//  â””â”€â”€â”€â”€â”€â”€â”€â”˜            â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		test('filter disabled root nodes', () => {
			// ARRANGE
			const trigger = createNodeData({ name: 'trigger' });
			const root = createNodeData({ name: 'root', disabled: true });
			const aiModel = createNodeData({ name: 'ai_model' });
			const destination = createNodeData({ name: 'destination' });

			const graph = new DirectedGraph()
				.addNodes(trigger, root, aiModel, destination)
				.addConnections(
					{ from: trigger, to: root },
					{ from: aiModel, type: NodeConnectionTypes.AiLanguageModel, to: root },
					{ from: root, to: destination },
				);

			// ACT
			const subgraph = filterDisabledNodes(graph);

			// ASSERT
			expect(subgraph).toEqual(
				new DirectedGraph()
					// The model is still in the graph, but orphaned. This is ok for
					// partial executions as findSubgraph will remove orphaned nodes.
					.addNodes(trigger, destination, aiModel)
					.addConnections({ from: trigger, to: destination }),
			);
		});
	});
});
