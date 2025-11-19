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

import type { INode } from 'workflow-automation-workflow';
import { NodeConnectionTypes } from 'workflow-automation-workflow';

import { createNodeData, defaultWorkflowParameter } from './helpers';
import { DirectedGraph } from '../directed-graph';

describe('DirectedGraph', () => {
	//     â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”
	//  â”Œâ”€â–ºâ”‚node1â”œâ”€â”€â”€â–ºâ”‚node2â”œâ”€â”€â–ºâ”‚node3â”œâ”€â”
	//  â”‚  â””â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”˜ â”‚
	//  â”‚                               â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	test('roundtrip', () => {
		// ARRANGE
		const node1 = createNodeData({ name: 'Node1' });
		const node2 = createNodeData({ name: 'Node2' });
		const node3 = createNodeData({ name: 'Node3' });

		// ACT
		const graph = new DirectedGraph()
			.addNodes(node1, node2, node3)
			.addConnections(
				{ from: node1, to: node2 },
				{ from: node2, to: node3 },
				{ from: node3, to: node1 },
			);

		// ASSERT
		expect(DirectedGraph.fromWorkflow(graph.toWorkflow({ ...defaultWorkflowParameter }))).toEqual(
			graph,
		);
	});

	//    â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”â”€â”€â–º null
	//    â”‚node1â”œâ”€â”€â”€â–ºâ”‚node2â”‚   â”Œâ”€â”€â”€â”€â”€â”
	//    â””â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”˜â”€â”€â–ºâ”‚node3â”‚
	//                         â””â”€â”€â”€â”€â”€â”˜
	//
	test('linear workflow with null connections', () => {
		// ARRANGE
		const node1 = createNodeData({ name: 'Node1' });
		const node2 = createNodeData({ name: 'Node2' });
		const node3 = createNodeData({ name: 'Node3' });

		// ACT
		const graph = new DirectedGraph()
			.addNodes(node1, node2, node3)
			.addConnections({ from: node1, to: node2 }, { from: node2, to: node3, outputIndex: 1 });

		// ASSERT
		expect(DirectedGraph.fromWorkflow(graph.toWorkflow({ ...defaultWorkflowParameter }))).toEqual(
			graph,
		);
	});

	describe('getChildren', () => {
		// â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”
		// â”‚node1â”œâ”€â”€â”€â–ºâ”‚node2â”œâ”€â”€â–ºâ”‚node3â”‚
		// â””â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”˜
		test('returns all children', () => {
			// ARRANGE
			const node1 = createNodeData({ name: 'Node1' });
			const node2 = createNodeData({ name: 'Node2' });
			const node3 = createNodeData({ name: 'Node3' });
			const graph = new DirectedGraph()
				.addNodes(node1, node2, node3)
				.addConnections({ from: node1, to: node2 }, { from: node2, to: node3 });

			// ACT
			const children = graph.getChildren(node1);

			// ASSERT
			expect(children.size).toBe(2);
			expect(children).toEqual(new Set([node2, node3]));
		});

		//     â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”
		//  â”Œâ”€â–ºâ”‚node1â”œâ”€â”€â”€â–ºâ”‚node2â”œâ”€â”€â–ºâ”‚node3â”œâ”€â”
		//  â”‚  â””â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”˜ â”‚
		//  â”‚                               â”‚
		//  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		test('terminates when finding a cycle', () => {
			// ARRANGE
			const node1 = createNodeData({ name: 'Node1' });
			const node2 = createNodeData({ name: 'Node2' });
			const node3 = createNodeData({ name: 'Node3' });
			const graph = new DirectedGraph()
				.addNodes(node1, node2, node3)
				.addConnections(
					{ from: node1, to: node2 },
					{ from: node2, to: node3 },
					{ from: node3, to: node1 },
				);

			// ACT
			const children = graph.getChildren(node1);

			// ASSERT
			expect(children.size).toBe(3);
			expect(children).toEqual(new Set([node1, node2, node3]));
		});
	});

	describe('getStronglyConnectedComponents', () => {
		// â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”
		// â”‚node1â”œâ”€â”€â”€â–ºâ”‚node2â”œâ”€â”€â”€â–ºâ”‚node4â”‚
		// â””â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”¬â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”˜
		//    â–²          â”‚
		//    â”‚          â”‚
		// â”Œâ”€â”€â”´â”€â”€â”       â”‚
		// â”‚node3â”‚â—„â”€â”€â”€â”€â”€â”€â”˜
		// â””â”€â”€â”€â”€â”€â”˜
		test('find strongly connected components', () => {
			// ARRANGE
			const node1 = createNodeData({ name: 'Node1' });
			const node2 = createNodeData({ name: 'Node2' });
			const node3 = createNodeData({ name: 'Node3' });
			const node4 = createNodeData({ name: 'Node4' });
			const graph = new DirectedGraph()
				.addNodes(node1, node2, node3, node4)
				.addConnections(
					{ from: node1, to: node2 },
					{ from: node2, to: node3 },
					{ from: node3, to: node1 },
					{ from: node2, to: node4 },
				);

			// ACT
			const stronglyConnectedComponents = graph.getStronglyConnectedComponents();

			// ASSERT
			expect(stronglyConnectedComponents).toHaveLength(2);
			expect(stronglyConnectedComponents).toContainEqual(new Set([node4]));
			expect(stronglyConnectedComponents).toContainEqual(new Set([node3, node2, node1]));
		});

		//                â”Œâ”€â”€â”€â”€â”
		//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”     â”‚    â”œâ”€
		//  â”‚triggerâ”œâ”€â”€â”¬â”€â”€â–ºloopâ”‚
		//  â””â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚  â”‚    â”œâ”€â”€â”€â”€â”
		//             â”‚  â””â”€â”€â”€â”€â”˜    â”‚
		//             â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”  â”‚
		//                â”Œâ”€â”€â”€â”€â” â”‚  â”‚
		//            â”Œâ”€â”€â”€â–ºnodeâ”œâ”€â”˜  â”‚
		//            â”‚   â””â”€â”€â”€â”€â”˜    â”‚
		//            â”‚             â”‚
		//            â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		test('find strongly connected components even if they use different output indexes', () => {
			// ARRANGE
			const trigger = createNodeData({ name: 'trigger' });
			const loop = createNodeData({ name: 'loop' });
			const node = createNodeData({ name: 'node' });
			const graph = new DirectedGraph()
				.addNodes(trigger, loop, node)
				.addConnections(
					{ from: trigger, to: loop },
					{ from: loop, outputIndex: 1, to: node },
					{ from: node, to: loop },
				);

			// ACT
			const stronglyConnectedComponents = graph.getStronglyConnectedComponents();

			// ASSERT
			expect(stronglyConnectedComponents).toHaveLength(2);
			expect(stronglyConnectedComponents).toContainEqual(new Set([trigger]));
			expect(stronglyConnectedComponents).toContainEqual(new Set([node, loop]));
		});
	});

	describe('depthFirstSearch', () => {
		// â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”
		// â”‚node0â”œâ”€â”€â”€â–ºâ”‚node1â”œâ”€â”€â”€â–ºâ”‚node2â”œâ”€â”€â”€â–ºâ”‚node4â”‚â”€â”€â”€â–ºâ”‚node5â”‚
		// â””â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”¬â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”˜
		//               â–²          â”‚
		//               â”‚          â”‚
		//            â”Œâ”€â”€â”´â”€â”€â”       â”‚
		//            â”‚node3â”‚â—„â”€â”€â”€â”€â”€â”€â”˜
		//            â””â”€â”€â”€â”€â”€â”˜
		test('calls nodes in the correct order and stops when it found the node', () => {
			// ARRANGE
			const node0 = createNodeData({ name: 'Node0' });
			const node1 = createNodeData({ name: 'Node1' });
			const node2 = createNodeData({ name: 'Node2' });
			const node3 = createNodeData({ name: 'Node3' });
			const node4 = createNodeData({ name: 'Node4' });
			const node5 = createNodeData({ name: 'Node5' });
			const graph = new DirectedGraph()
				.addNodes(node0, node1, node2, node3, node4, node5)
				.addConnections(
					{ from: node0, to: node1 },
					{ from: node1, to: node2 },
					{ from: node2, to: node3 },
					{ from: node3, to: node1 },
					{ from: node2, to: node4 },
					{ from: node4, to: node5 },
				);
			const fn = jest.fn().mockImplementation((node: INode) => node === node4);

			// ACT
			const foundNode = graph.depthFirstSearch({
				from: node0,
				fn,
			});

			// ASSERT
			expect(foundNode).toBe(node4);
			expect(fn).toHaveBeenCalledTimes(5);
			expect(fn.mock.calls).toEqual([[node0], [node1], [node2], [node3], [node4]]);
		});
	});

	describe('getParentConnections', () => {
		// â”Œâ”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”
		// â”‚node1â”œâ”€â”€â–ºâ”‚node2â”œâ”€â”€â–ºâ”‚node3â”‚â”€â”€â–ºâ”‚node4â”‚
		// â””â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”˜
		test('returns all parent connections', () => {
			// ARRANGE
			const node1 = createNodeData({ name: 'Node1' });
			const node2 = createNodeData({ name: 'Node2' });
			const node3 = createNodeData({ name: 'Node3' });
			const node4 = createNodeData({ name: 'Node4' });
			const graph = new DirectedGraph()
				.addNodes(node1, node2, node3, node4)
				.addConnections(
					{ from: node1, to: node2 },
					{ from: node2, to: node3 },
					{ from: node3, to: node4 },
				);

			// ACT
			const connections = graph.getParentConnections(node3);

			// ASSERT
			const expectedConnections = graph.getConnections().filter((c) => c.to !== node4);
			expect(connections.size).toBe(2);
			expect(connections).toEqual(new Set(expectedConnections));
		});

		//     â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”
		//  â”Œâ”€â–ºâ”‚node1â”œâ”€â”€â”€â–ºâ”‚node2â”œâ”€â”€â–ºâ”‚node3â”œâ”€â”
		//  â”‚  â””â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”˜ â”‚
		//  â”‚                               â”‚
		//  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		test('terminates when finding a cycle', () => {
			// ARRANGE
			const node1 = createNodeData({ name: 'Node1' });
			const node2 = createNodeData({ name: 'Node2' });
			const node3 = createNodeData({ name: 'Node3' });
			const graph = new DirectedGraph()
				.addNodes(node1, node2, node3)
				.addConnections(
					{ from: node1, to: node2 },
					{ from: node2, to: node3 },
					{ from: node3, to: node1 },
				);

			// ACT
			const connections = graph.getParentConnections(node3);

			// ASSERT
			expect(connections.size).toBe(3);
			expect(connections).toEqual(new Set(graph.getConnections()));
		});
	});

	describe('removeNode', () => {
		//              XX
		//  â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”
		//  â”‚node0â”œâ”€â”€â”€â–ºâ”‚node1â”œâ”€â”€â–ºâ”‚node2â”‚
		//  â””â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”˜
		// turns into
		//  â”Œâ”€â”€â”€â”€â”€â”              â”Œâ”€â”€â”€â”€â”€â”
		//  â”‚node0â”‚              â”‚node2â”‚
		//  â””â”€â”€â”€â”€â”€â”˜              â””â”€â”€â”€â”€â”€â”˜
		test('remove node and all connections', () => {
			// ARRANGE
			const node0 = createNodeData({ name: 'node0' });
			const node1 = createNodeData({ name: 'node1' });
			const node2 = createNodeData({ name: 'node2' });
			const graph = new DirectedGraph()
				.addNodes(node0, node1, node2)
				.addConnections({ from: node0, to: node1 }, { from: node0, to: node2 });

			// ACT
			graph.removeNode(node1);

			// ASSERT
			expect(graph).toEqual(
				new DirectedGraph().addNodes(node0, node2).addConnections({ from: node0, to: node2 }),
			);
		});

		//              XX
		//  â”Œâ”€â”€â”€â”€â”€â”    â”Œâ”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”
		//  â”‚node0â”œâ”€â”€â”€â–ºâ”‚node1â”œâ”€â”€â–ºâ”‚node2â”‚
		//  â””â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”˜
		// turns into
		//  â”Œâ”€â”€â”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”
		//  â”‚node0â”œâ”€â”€â–ºâ”‚node2â”‚
		//  â””â”€â”€â”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”˜
		test('remove node, but reconnect connections', () => {
			// ARRANGE
			const node0 = createNodeData({ name: 'node0' });
			const node1 = createNodeData({ name: 'node1' });
			const node2 = createNodeData({ name: 'node2' });
			const graph = new DirectedGraph()
				.addNodes(node0, node1, node2)
				.addConnections({ from: node0, to: node1 }, { from: node1, to: node2 });

			// ACT
			const newConnections = graph.removeNode(node1, { reconnectConnections: true });

			// ASSERT
			expect(newConnections).toHaveLength(1);
			expect(newConnections[0]).toEqual({
				from: node0,
				outputIndex: 0,
				type: NodeConnectionTypes.Main,
				inputIndex: 0,
				to: node2,
			});
			expect(graph).toEqual(
				new DirectedGraph().addNodes(node0, node2).addConnections({ from: node0, to: node2 }),
			);
		});

		//               XX
		//  â”Œâ”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”
		//  â”‚     â”‚o   oâ”‚     â”‚o   oâ”‚     â”‚
		//  â”‚     â”‚oâ”€â” oâ”‚     â”‚o   oâ”‚     â”‚
		//  â”‚node0â”‚o â””â–ºoâ”‚node1â”‚o   oâ”‚node2â”‚
		//  â”‚     â”‚o   oâ”‚     â”‚oâ”€â” oâ”‚     â”‚
		//  â”‚     â”‚o   oâ”‚     â”‚o â””â–ºoâ”‚     â”‚
		//  â””â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”˜
		// turns into
		//  â”Œâ”€â”€â”€â”€â”€â”                 â”Œâ”€â”€â”€â”€â”€â”
		//  â”‚     â”‚o               oâ”‚     â”‚
		//  â”‚     â”‚oâ”€â”€â”€â”€â”€â”€â”€â”       oâ”‚     â”‚
		//  â”‚node0â”‚o       â”‚       oâ”‚node2â”‚
		//  â”‚     â”‚o       â”‚       oâ”‚     â”‚
		//  â”‚     â”‚o       â””â”€â”€â”€â”€â”€â”€â–ºoâ”‚     â”‚
		//  â””â”€â”€â”€â”€â”€â”˜                 â””â”€â”€â”€â”€â”€â”˜
		test('remove node, reconnect connections and retaining the input indexes', () => {
			// ARRANGE
			const node0 = createNodeData({ name: 'node0' });
			const node1 = createNodeData({ name: 'node1' });
			const node2 = createNodeData({ name: 'node2' });
			const graph = new DirectedGraph()
				.addNodes(node0, node1, node2)
				.addConnections(
					{ from: node0, outputIndex: 1, inputIndex: 2, to: node1 },
					{ from: node1, outputIndex: 3, inputIndex: 4, to: node2 },
				);

			// ACT
			const newConnections = graph.removeNode(node1, { reconnectConnections: true });

			// ASSERT
			expect(newConnections).toHaveLength(1);
			expect(newConnections[0]).toEqual({
				from: node0,
				outputIndex: 1,
				type: NodeConnectionTypes.Main,
				inputIndex: 4,
				to: node2,
			});
			expect(graph).toEqual(
				new DirectedGraph()
					.addNodes(node0, node2)
					.addConnections({ from: node0, outputIndex: 1, inputIndex: 4, to: node2 }),
			);
		});

		//               XX
		//  â”Œâ”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”
		//  â”‚     â”‚o   oâ”‚     â”‚o    â”‚     â”‚
		//  â”‚     â”‚oâ”€â” oâ”‚     â”‚o    â”‚     â”‚
		//  â”‚node0â”‚  â””â–ºoâ”‚node1â”‚o â”Œâ–ºoâ”‚node2â”‚
		//  â”‚     â”‚     â”‚     â”‚oâ”€â”˜  â”‚     â”‚
		//  â”‚     â”‚     â”‚     â”‚     â”‚     â”‚
		//  â””â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”˜
		// turns into
		//  â”Œâ”€â”€â”€â”€â”€â”                 â”Œâ”€â”€â”€â”€â”€â”
		//  â”‚     â”‚o                â”‚     â”‚
		//  â”‚     â”‚oâ”€â”€â”€â”€â”€â”€â”€â”        â”‚     â”‚
		//  â”‚node0â”‚        â””â”€â”€â”€â”€â”€â”€â–ºoâ”‚node2â”‚
		//  â”‚     â”‚                 â”‚     â”‚
		//  â”‚     â”‚                 â”‚     â”‚
		//  â””â”€â”€â”€â”€â”€â”˜                 â””â”€â”€â”€â”€â”€â”˜
		test('remove node, reconnect connections and retaining the input indexes, even if the child has less inputs than the than the removed node had', () => {
			// ARRANGE
			const node0 = createNodeData({ name: 'node0' });
			const node1 = createNodeData({ name: 'node1' });
			const node2 = createNodeData({ name: 'node2' });
			const graph = new DirectedGraph()
				.addNodes(node0, node1, node2)
				.addConnections(
					{ from: node0, outputIndex: 1, inputIndex: 2, to: node1 },
					{ from: node1, outputIndex: 3, inputIndex: 0, to: node2 },
				);

			// ACT
			const newConnections = graph.removeNode(node1, { reconnectConnections: true });

			// ASSERT
			const expectedGraph = new DirectedGraph()
				.addNodes(node0, node2)
				.addConnections({ from: node0, outputIndex: 1, inputIndex: 0, to: node2 });
			expect(newConnections).toHaveLength(1);
			expect(newConnections).toEqual(expectedGraph.getConnections());
			expect(graph).toEqual(expectedGraph);
		});

		//  â”Œâ”€â”€â”€â”€â”€â”                â”Œâ”€â”€â”€â”€â”€â”€â”
		//  â”‚left0â”œâ”€â”   XX       â”Œâ–ºâ”‚right0â”‚
		//  â””â”€â”€â”€â”€â”€â”˜ â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”  â”‚ â””â”€â”€â”€â”€â”€â”€â”˜
		//          â”œâ”€â–ºâ”‚centerâ”œâ”€â”€â”¤
		//  â”Œâ”€â”€â”€â”€â”€â” â”‚  â””â”€â”€â”€â”€â”€â”€â”˜  â”‚ â”Œâ”€â”€â”€â”€â”€â”€â”
		//  â”‚left1â”œâ”€â”˜            â””â–ºâ”‚right1â”‚
		//  â””â”€â”€â”€â”€â”€â”˜                â””â”€â”€â”€â”€â”€â”€â”˜
		// turns into
		//
		//  â”Œâ”€â”€â”€â”€â”€â”                â”Œâ”€â”€â”€â”€â”€â”€â”
		//  â”‚left0â”œâ”€â”           â”Œâ”€â–ºâ”‚right0â”‚
		//  â””â”€â”€â”€â”€â”€â”˜ â”‚           â”‚  â””â”€â”€â”€â”€â”€â”€â”˜
		//          â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
		//  â”Œâ”€â”€â”€â”€â”€â” â”‚           â”‚  â”Œâ”€â”€â”€â”€â”€â”€â”
		//  â”‚left1â”œâ”€â”˜           â””â”€â–ºâ”‚right1â”‚
		//  â””â”€â”€â”€â”€â”€â”˜                â””â”€â”€â”€â”€â”€â”€â”˜
		test('remove node, reconnect connections and multiplexes them', () => {
			// ARRANGE
			const left0 = createNodeData({ name: 'left0' });
			const left1 = createNodeData({ name: 'left1' });
			const center = createNodeData({ name: 'center' });
			const right0 = createNodeData({ name: 'right0' });
			const right1 = createNodeData({ name: 'right1' });
			const graph = new DirectedGraph()
				.addNodes(left0, left1, center, right0, right1)
				.addConnections(
					{ from: left0, to: center },
					{ from: left1, to: center },
					{ from: center, to: right0 },
					{ from: center, to: right1 },
				);

			// ACT
			const newConnections = graph.removeNode(center, { reconnectConnections: true });

			// ASSERT
			const expectedGraph = new DirectedGraph()
				.addNodes(left0, left1, right0, right1)
				.addConnections(
					{ from: left0, to: right0 },
					{ from: left0, to: right1 },
					{ from: left1, to: right0 },
					{ from: left1, to: right1 },
				);
			expect(newConnections).toHaveLength(4);
			expect(newConnections).toEqual(expectedGraph.getConnections());
			expect(graph).toEqual(expectedGraph);
		});
	});

	describe('hasNode', () => {
		test("returns node if it's part of the graph", () => {
			// ARRANGE
			const node = createNodeData({ name: 'node' });
			const graph = new DirectedGraph().addNodes(node);

			// ACT & ASSERT
			expect(graph.hasNode(node.name)).toBe(true);
		});

		test('returns undefined if there is no node with that name in the graph', () => {
			// ARRANGE
			const node = createNodeData({ name: 'node' });
			const graph = new DirectedGraph().addNodes(node);

			// ACT & ASSERT
			expect(graph.hasNode(node.name + 'foo')).toBe(false);
		});
	});

	describe('getNodesByNames', () => {
		test('returns empty Set when no names are provided', () => {
			// ARRANGE
			const node1 = createNodeData({ name: 'Node1' });
			const node2 = createNodeData({ name: 'Node2' });
			const graph = new DirectedGraph().addNodes(node1, node2);

			// ACT
			const result = graph.getNodesByNames([]);

			// ASSERT
			expect(result.size).toBe(0);
			expect(result).toEqual(new Set());
		});

		test('returns Set with only nodes that exist in the graph', () => {
			// ARRANGE
			const node1 = createNodeData({ name: 'Node1' });
			const node2 = createNodeData({ name: 'Node2' });
			const node3 = createNodeData({ name: 'Node3' });
			const graph = new DirectedGraph().addNodes(node1, node2, node3);

			// ACT
			const result = graph.getNodesByNames(['Node1', 'Node3', 'Node4']);

			// ASSERT
			expect(result.size).toBe(2);
			expect(result).toEqual(new Set([node1, node3]));
		});
	});
});
