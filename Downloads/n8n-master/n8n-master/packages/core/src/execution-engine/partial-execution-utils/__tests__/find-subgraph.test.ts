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
import { findSubgraph } from '../find-subgraph';

describe('findSubgraph', () => {
	//                 â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
	//  â”‚triggerâ”œâ”€â”€â”€â”€â–ºâ”‚destinationâ”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	test('simple', () => {
		const trigger = createNodeData({ name: 'trigger' });
		const destination = createNodeData({ name: 'destination' });

		const graph = new DirectedGraph()
			.addNodes(trigger, destination)
			.addConnections({ from: trigger, to: destination });

		const subgraph = findSubgraph({ graph, destination, trigger });

		expect(subgraph).toEqual(graph);
	});

	//                 â–ºâ–º
	//                â”Œâ”€â”€â”€â”€â”€â”€â”
	//                â”‚orphanâ”‚
	//                â””â”€â”€â”€â”€â”€â”€â”˜
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
	//  â”‚triggerâ”œâ”€â”€â”€â”€â–ºâ”‚destinationâ”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	test('works with a single node', () => {
		const trigger = createNodeData({ name: 'trigger' });
		const destination = createNodeData({ name: 'destination' });
		const orphan = createNodeData({ name: 'orphan' });

		const graph = new DirectedGraph()
			.addNodes(trigger, destination, orphan)
			.addConnections({ from: trigger, to: destination });

		const subgraph = findSubgraph({ graph, destination: orphan, trigger: orphan });

		expect(subgraph).toEqual(new DirectedGraph().addNode(orphan));
	});

	//                     â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚           â”‚
	//  â”‚triggerâ”‚         â”‚destinationâ”‚
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚           â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜         â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	test('multiple connections', () => {
		const ifNode = createNodeData({ name: 'If' });
		const noOp = createNodeData({ name: 'noOp' });

		const graph = new DirectedGraph()
			.addNodes(ifNode, noOp)
			.addConnections(
				{ from: ifNode, to: noOp, outputIndex: 0 },
				{ from: ifNode, to: noOp, outputIndex: 1 },
			);

		const subgraph = findSubgraph({ graph, destination: noOp, trigger: ifNode });

		expect(subgraph).toEqual(graph);
	});

	//                     â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”         â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚           â”‚      â”Œâ”€â”€â”€â”€â”
	//  â”‚triggerâ”‚         â”‚destinationâ”œâ”€â”€â”€â”€â”€â–ºâ”‚nodeâ”‚
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚           â”‚      â””â”€â”€â”€â”€â”˜
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜         â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	test('disregard nodes after destination', () => {
		const trigger = createNodeData({ name: 'trigger' });
		const destination = createNodeData({ name: 'destination' });
		const node = createNodeData({ name: 'node' });

		const graph = new DirectedGraph()
			.addNodes(trigger, destination, node)
			.addConnections({ from: trigger, to: destination }, { from: destination, to: node });

		const subgraph = findSubgraph({ graph, destination, trigger });

		expect(subgraph).toEqual(
			new DirectedGraph()
				.addNodes(trigger, destination)
				.addConnections({ from: trigger, to: destination }),
		);
	});

	//                                â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”       â”Œâ”€â”€â”€â”€â”€â”      â”Œâ”€â”€â”€â”€â”€â”
	//  â”‚Triggerâ”œâ”€â”€â”€â”¬â”€â”€â–ºâ”‚Node1â”œâ”€â”€â”€â”¬â”€â–ºâ”‚Node2â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚   â””â”€â”€â”€â”€â”€â”˜   â”‚  â””â”€â”€â”€â”€â”€â”˜
	//              â”‚             â”‚
	//              â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	test('terminates when called with graph that contains cycles', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node1 = createNodeData({ name: 'node1' });
		const node2 = createNodeData({ name: 'node2' });
		const graph = new DirectedGraph()
			.addNodes(trigger, node1, node2)
			.addConnections(
				{ from: trigger, to: node1 },
				{ from: node1, to: node1 },
				{ from: node1, to: node2 },
			);

		// ACT
		const subgraph = findSubgraph({ graph, destination: node2, trigger });

		// ASSERT
		expect(subgraph).toEqual(graph);
	});

	//                â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”
	//  â”‚Triggerâ”œâ”€â”€â”¬â”€â–ºâ”‚Node1â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚  â””â”€â”€â”€â”€â”€â”˜
	//             â”‚
	//  â”Œâ”€â”€â”€â”€â”€â”    â”‚
	//  â”‚Node2â”œâ”€â”€â”€â”€â”˜
	//  â””â”€â”€â”€â”€â”€â”˜
	test('terminates when called with graph that contains cycles', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node1 = createNodeData({ name: 'node1' });
		const node2 = createNodeData({ name: 'node2' });
		const graph = new DirectedGraph()
			.addNodes(trigger, node1, node2)
			.addConnections({ from: trigger, to: node1 }, { from: node2, to: node1 });

		// ACT
		const subgraph = findSubgraph({ graph, destination: node1, trigger });

		// ASSERT
		expect(subgraph).toEqual(
			new DirectedGraph().addNodes(trigger, node1).addConnections({ from: trigger, to: node1 }),
		);
	});

	//                               â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
	//  â”‚Triggerâ”œâ”€â”¬â”€â–ºâ”‚Destinationâ”œâ”€â”€â–ºâ”‚AnotherNodeâ”œâ”€â”€â”€â”
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚
	//            â”‚                                  â”‚
	//            â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	test('terminates if the destination node is part of a cycle', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const destination = createNodeData({ name: 'destination' });
		const anotherNode = createNodeData({ name: 'anotherNode' });
		const graph = new DirectedGraph()
			.addNodes(trigger, destination, anotherNode)
			.addConnections(
				{ from: trigger, to: destination },
				{ from: destination, to: anotherNode },
				{ from: anotherNode, to: destination },
			);

		// ACT
		const subgraph = findSubgraph({ graph, destination, trigger });

		// ASSERT
		expect(subgraph).toEqual(
			new DirectedGraph()
				.addNodes(trigger, destination)
				.addConnections({ from: trigger, to: destination }),
		);
	});

	describe('root nodes', () => {
		//                 â–ºâ–º
		//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”      â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
		//  â”‚triggerâ”œâ”€â”€â”€â”€â”€â–ºâ”‚destinationâ”‚
		//  â””â”€â”€â”€â”€â”€â”€â”€â”˜      â””â”€â”€â–²â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		//                    â”‚AiLanguageModel
		//                   â”Œâ”´â”€â”€â”€â”€â”€â”€â”
		//                   â”‚aiModelâ”‚
		//                   â””â”€â”€â”€â”€â”€â”€â”€â”˜
		test('always retain connections that have a different type than `NodeConnectionTypes.Main`', () => {
			// ARRANGE
			const trigger = createNodeData({ name: 'trigger' });
			const destination = createNodeData({ name: 'destination' });
			const aiModel = createNodeData({ name: 'ai_model' });

			const graph = new DirectedGraph()
				.addNodes(trigger, destination, aiModel)
				.addConnections(
					{ from: trigger, to: destination },
					{ from: aiModel, type: NodeConnectionTypes.AiLanguageModel, to: destination },
				);

			// ACT
			const subgraph = findSubgraph({ graph, destination, trigger });

			// ASSERT
			expect(subgraph).toEqual(graph);
		});

		// This graph is not possible, it's only here to make sure `findSubgraph`
		// does not follow non-Main connections.
		//
		//  â”Œâ”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
		//  â”‚rootâ”¼â”€â”€â”€â–ºdestinationâ”‚
		//  â””â”€â”€â–²â”€â”˜   â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		//     â”‚AiLanguageModel
		//    â”Œâ”´â”€â”€â”€â”€â”€â”€â”
		//    â”‚aiModelâ”‚
		//    â””â–²â”€â”€â”€â”€â”€â”€â”˜
		//    â”Œâ”´â”€â”€â”€â”€â”€â”€â”
		//    â”‚triggerâ”‚
		//    â””â”€â”€â”€â”€â”€â”€â”€â”˜
		// turns into an empty graph, because there is no `Main` typed connection
		// connecting destination and trigger.
		test('skip non-Main connection types', () => {
			// ARRANGE
			const trigger = createNodeData({ name: 'trigger' });
			const root = createNodeData({ name: 'root' });
			const aiModel = createNodeData({ name: 'aiModel' });
			const destination = createNodeData({ name: 'destination' });
			const graph = new DirectedGraph()
				.addNodes(trigger, root, aiModel, destination)
				.addConnections(
					{ from: trigger, to: aiModel },
					{ from: aiModel, type: NodeConnectionTypes.AiLanguageModel, to: root },
					{ from: root, to: destination },
				);

			// ACT
			const subgraph = findSubgraph({ graph, destination, trigger });

			// ASSERT
			expect(subgraph.getConnections()).toHaveLength(0);
			expect(subgraph.getNodes().size).toBe(0);
		});

		//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”            â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
		//  â”‚triggerâ”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–ºdestinationâ”‚
		//  â””â”€â”€â”€â”€â”€â”€â”€â”˜            â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		//
		//                â”Œâ”€â”€â”€â”€â”€â”€â”€â”
		//                â”‚aiModelâ”‚
		//                â””â”€â”€â”€â”€â”€â”€â”€â”˜
		// turns into
		//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”            â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
		//  â”‚triggerâ”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â–ºdestinationâ”‚
		//  â””â”€â”€â”€â”€â”€â”€â”€â”˜            â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		test('remove orphaned nodes', () => {
			// ARRANGE
			const trigger = createNodeData({ name: 'trigger' });
			const aiModel = createNodeData({ name: 'ai_model' });
			const destination = createNodeData({ name: 'destination' });

			const graph = new DirectedGraph()
				.addNodes(trigger, aiModel, destination)
				.addConnections({ from: trigger, to: destination });

			// ACT
			const subgraph = findSubgraph({ graph, destination, trigger });

			// ASSERT
			expect(subgraph).toEqual(
				new DirectedGraph()
					.addNodes(trigger, destination)
					.addConnections({ from: trigger, to: destination }),
			);
		});
	});
});
