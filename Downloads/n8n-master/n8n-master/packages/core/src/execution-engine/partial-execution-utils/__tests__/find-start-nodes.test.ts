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

import { type IPinData, type IRunData } from 'workflow-automation-workflow';

import { createNodeData, toITaskData } from './helpers';
import { DirectedGraph } from '../directed-graph';
import { findStartNodes, isDirty } from '../find-start-nodes';

describe('isDirty', () => {
	test("if the node has pinned data it's not dirty", () => {
		const node = createNodeData({ name: 'Basic Node' });

		const pinData: IPinData = {
			[node.name]: [{ json: { value: 1 } }],
		};

		expect(isDirty(node, undefined, pinData)).toBe(false);
	});

	test("if the node has run data it's not dirty", () => {
		const node = createNodeData({ name: 'Basic Node' });

		const runData: IRunData = {
			[node.name]: [toITaskData([{ data: { value: 1 } }])],
		};

		expect(isDirty(node, runData)).toBe(false);
	});
});

describe('findStartNodes', () => {
	//   â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”
	//  â”‚triggerâ”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜
	test('finds the start node if there is only a trigger', () => {
		const node = createNodeData({ name: 'Basic Node' });
		const graph = new DirectedGraph().addNode(node);

		const startNodes = findStartNodes({
			graph,
			trigger: node,
			destination: node,
			pinData: {},
			runData: {},
		});

		expect(startNodes.size).toBe(1);
		expect(startNodes).toContainEqual(node);
	});

	//                 â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
	//  â”‚triggerâ”œâ”€â”€â”€â”€â–ºâ”‚destinationâ”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜     â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
	test('finds the start node in a simple graph', () => {
		const trigger = createNodeData({ name: 'trigger' });
		const destination = createNodeData({ name: 'destination' });
		const graph = new DirectedGraph()
			.addNodes(trigger, destination)
			.addConnection({ from: trigger, to: destination });

		// if the trigger has no run data
		{
			const startNodes = findStartNodes({
				graph,
				trigger,
				destination,
				pinData: {},
				runData: {},
			});

			expect(startNodes.size).toBe(1);
			expect(startNodes).toContainEqual(trigger);
		}

		// if the trigger has run data
		{
			const runData: IRunData = {
				[trigger.name]: [toITaskData([{ data: { value: 1 } }])],
			};

			const startNodes = findStartNodes({
				graph,
				trigger,
				destination,
				runData,
				pinData: {},
			});

			expect(startNodes.size).toBe(1);
			expect(startNodes).toContainEqual(destination);
		}
	});

	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”       â–ºâ–º
	//  â”‚       â”‚1â”€â”€â”  â”Œâ”€â”€â”€â”€â”
	//  â”‚triggerâ”‚   â”œâ”€â–ºâ”‚nodeâ”‚
	//  â”‚       â”‚1â”€â”€â”˜  â””â”€â”€â”€â”€â”˜
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜
	//  All nodes have run data. `findStartNodes` should return node twice
	//  because it has 2 input connections.
	test('multiple outputs', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node = createNodeData({ name: 'node' });
		const graph = new DirectedGraph()
			.addNodes(trigger, node)
			.addConnections(
				{ from: trigger, to: node, outputIndex: 0, inputIndex: 0 },
				{ from: trigger, to: node, outputIndex: 1, inputIndex: 0 },
			);
		const runData: IRunData = {
			[trigger.name]: [
				toITaskData([
					{ data: { value: 1 }, outputIndex: 0 },
					{ data: { value: 1 }, outputIndex: 1 },
				]),
			],
			[node.name]: [toITaskData([{ data: { value: 1 } }])],
		};

		// ACT
		const startNodes = findStartNodes({
			graph,
			trigger,
			destination: node,
			runData,
			pinData: {},
		});

		// ASSERT
		expect(startNodes.size).toBe(1);
		expect(startNodes).toContainEqual(node);
	});

	//             â”Œâ”€â”€â”€â”€â”€â”              â”Œâ”€â”€â”€â”€â”€â”          â–ºâ–º
	//â”Œâ”€â”€â”€â”€â”€â”€â”€â”    â”‚     â”œâ”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚     â”‚         â”Œâ”€â”€â”€â”€â”€â”
	//â”‚triggerâ”œâ”€â”€â”€â–ºâ”‚node1â”‚    â”‚         â”‚node2â”œâ”€â”€â”€â”€â”¬â”€â”€â”€â–ºâ”‚node4â”‚
	//â””â”€â”€â”€â”€â”€â”€â”€â”˜    â”‚     â”œâ”€â”€â”€â”€â”¼â”€â”€â”€â”€â”¬â”€â”€â”€â–ºâ”‚     â”‚    â”‚    â””â”€â”€â”€â”€â”€â”˜
	//             â””â”€â”€â”€â”€â”€â”˜    â”‚    â”‚    â””â”€â”€â”€â”€â”€â”˜    â”‚
	//                        â”‚    â”‚               â”‚
	//                        â”‚    â”‚               â”‚
	//                        â”‚    â”‚               â”‚
	//                        â”‚    â”‚    â”Œâ”€â”€â”€â”€â”€â”    â”‚
	//                        â”‚    â””â”€â”€â”€â–ºâ”‚     â”‚    â”‚
	//                        â”‚         â”‚node3â”œâ”€â”€â”€â”€â”˜
	//                        â””â”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚     â”‚
	//                                  â””â”€â”€â”€â”€â”€â”˜
	test('complex example with multiple outputs and inputs', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node1 = createNodeData({ name: 'node1' });
		const node2 = createNodeData({ name: 'node2' });
		const node3 = createNodeData({ name: 'node3' });
		const node4 = createNodeData({ name: 'node4' });
		const graph = new DirectedGraph()
			.addNodes(trigger, node1, node2, node3, node4)
			.addConnections(
				{ from: trigger, to: node1 },
				{ from: node1, to: node2, outputIndex: 0, inputIndex: 0 },
				{ from: node1, to: node2, outputIndex: 1, inputIndex: 1 },
				{ from: node1, to: node3, outputIndex: 0, inputIndex: 1 },
				{ from: node1, to: node3, outputIndex: 1, inputIndex: 0 },
				{ from: node2, to: node4 },
				{ from: node3, to: node4 },
			);

		{
			// ACT
			const startNodes = findStartNodes({
				graph,
				trigger,
				destination: node4,
				pinData: {},
				runData: {},
			});

			// ASSERT
			expect(startNodes.size).toBe(1);
			// no run data means the trigger is the start node
			expect(startNodes).toContainEqual(trigger);
		}

		{
			// run data for everything
			const runData: IRunData = {
				[trigger.name]: [toITaskData([{ data: { value: 1 } }])],
				[node1.name]: [toITaskData([{ data: { value: 1 } }])],
				[node2.name]: [toITaskData([{ data: { value: 1 } }])],
				[node3.name]: [toITaskData([{ data: { value: 1 } }])],
				[node4.name]: [toITaskData([{ data: { value: 1 } }])],
			};

			// ACT
			const startNodes = findStartNodes({
				graph,
				trigger,
				destination: node4,
				runData,
				pinData: {},
			});

			// ASSERT
			expect(startNodes.size).toBe(1);
			expect(startNodes).toContainEqual(node4);
		}
	});

	//                     â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”1        â”Œâ”€â”€â”€â”€â”
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚    â”‚
	//  â”‚triggerâ”‚         â”‚nodeâ”‚
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚    â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜0        â””â”€â”€â”€â”€â”˜
	//  The merge node only gets data on one input, so the it should only be once
	//  in the start nodes
	test('multiple connections with the first one having data', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node = createNodeData({ name: 'node' });

		const graph = new DirectedGraph()
			.addNodes(trigger, node)
			.addConnections(
				{ from: trigger, to: node, inputIndex: 0, outputIndex: 0 },
				{ from: trigger, to: node, inputIndex: 1, outputIndex: 1 },
			);

		// ACT
		const startNodes = findStartNodes({
			graph,
			trigger,
			destination: node,
			runData: {
				[trigger.name]: [toITaskData([{ data: { value: 1 }, outputIndex: 0 }])],
			},
			pinData: {},
		});

		// ASSERT
		expect(startNodes.size).toBe(1);
		expect(startNodes).toContainEqual(node);
	});

	//                     â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”0        â”Œâ”€â”€â”€â”€â”
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚    â”‚
	//  â”‚triggerâ”‚         â”‚nodeâ”‚
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚    â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜1        â””â”€â”€â”€â”€â”˜
	//  The merge node only gets data on one input, so the it should only be once
	//  in the start nodes
	test('multiple connections with the second one having data', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node = createNodeData({ name: 'node' });

		const graph = new DirectedGraph()
			.addNodes(trigger, node)
			.addConnections(
				{ from: trigger, to: node, inputIndex: 0, outputIndex: 0 },
				{ from: trigger, to: node, inputIndex: 1, outputIndex: 1 },
			);

		// ACT
		const startNodes = findStartNodes({
			graph,
			trigger,
			destination: node,
			runData: {
				[trigger.name]: [toITaskData([{ data: { value: 1 }, outputIndex: 1 }])],
			},
			pinData: {},
		});

		// ASSERT
		expect(startNodes.size).toBe(1);
		expect(startNodes).toContainEqual(node);
	});

	//                     â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”1        â”Œâ”€â”€â”€â”€â”
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚    â”‚
	//  â”‚triggerâ”‚         â”‚nodeâ”‚
	//  â”‚       â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚    â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜1        â””â”€â”€â”€â”€â”˜
	//  The merge node gets data on both inputs, so the it should be in the start
	//  nodes twice.
	test('multiple connections with both having data', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node = createNodeData({ name: 'node' });

		const graph = new DirectedGraph()
			.addNodes(trigger, node)
			.addConnections(
				{ from: trigger, to: node, inputIndex: 0, outputIndex: 0 },
				{ from: trigger, to: node, inputIndex: 1, outputIndex: 1 },
			);

		// ACT
		const startNodes = findStartNodes({
			graph,
			trigger,
			destination: node,
			runData: {
				[trigger.name]: [
					toITaskData([
						{ data: { value: 1 }, outputIndex: 0 },
						{ data: { value: 1 }, outputIndex: 1 },
					]),
				],
			},
			pinData: {},
		});

		// ASSERT
		expect(startNodes.size).toBe(1);
		expect(startNodes).toContainEqual(node);
	});

	//                     â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”         â”Œâ”€â”€â”€â”€â”
	//  â”‚       â”‚1  â”Œâ”€â”€â”€â”€â–ºâ”‚    â”‚
	//  â”‚triggerâ”œâ”€â”€â”€â”¤     â”‚nodeâ”‚
	//  â”‚       â”‚   â””â”€â”€â”€â”€â–ºâ”‚    â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜         â””â”€â”€â”€â”€â”˜
	test('multiple connections with both having data', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node1 = createNodeData({ name: 'node1' });
		const node2 = createNodeData({ name: 'node2' });
		const node3 = createNodeData({ name: 'node3' });
		const graph = new DirectedGraph()
			.addNodes(trigger, node1, node2, node3)
			.addConnections(
				{ from: trigger, to: node1 },
				{ from: trigger, to: node2 },
				{ from: node1, to: node3 },
				{ from: node2, to: node3 },
			);

		// ACT
		const startNodes = findStartNodes({
			graph,
			trigger,
			destination: node3,
			runData: {
				[trigger.name]: [toITaskData([{ data: { value: 1 }, outputIndex: 0 }])],
				[node1.name]: [toITaskData([{ data: { value: 1 }, outputIndex: 0 }])],
				[node2.name]: [toITaskData([{ data: { value: 1 }, outputIndex: 0 }])],
			},
			pinData: {},
		});

		// ASSERT
		expect(startNodes.size).toBe(1);
		expect(startNodes).toContainEqual(node3);
	});

	//                                    â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”        â”Œâ”€â”€â”€â”€â”€â”0        â”Œâ”€â”€â”€â”€â”€â”
	//  â”‚       â”‚1       â”‚     â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚     â”‚
	//  â”‚triggerâ”œâ”€â”€â”€â”€â”€â”€â”€â–ºâ”‚node1â”‚         â”‚node2â”‚
	//  â”‚       â”‚        â”‚     â”œâ”€â”€â”€â”€â”€â”€â”€â”€â–ºâ”‚     â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜        â””â”€â”€â”€â”€â”€â”˜1        â””â”€â”€â”€â”€â”€â”˜
	test('multiple connections with trigger', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node1 = createNodeData({ name: 'node1' });
		const node2 = createNodeData({ name: 'node2' });

		const graph = new DirectedGraph()
			.addNodes(trigger, node1, node2)
			.addConnections(
				{ from: trigger, to: node1 },
				{ from: node1, to: node2, outputIndex: 0 },
				{ from: node1, to: node2, outputIndex: 1 },
			);

		// ACT
		const startNodes = findStartNodes({
			graph,
			trigger: node1,
			destination: node2,
			runData: {
				[trigger.name]: [toITaskData([{ data: { value: 1 } }])],
				[node1.name]: [toITaskData([{ data: { value: 1 }, outputIndex: 1 }])],
			},
			pinData: {},
		});

		// ASSERT
		expect(startNodes.size).toBe(1);
		expect(startNodes).toContainEqual(node2);
	});

	//                              â–ºâ–º
	//â”Œâ”€â”€â”€â”€â”€â”€â”€â”1      â”Œâ”€â”€â”€â”€â”€â”1     â”Œâ”€â”€â”€â”€â”€â”
	//â”‚Triggerâ”œâ”€â”€â”€â”¬â”€â”€â–ºâ”‚Node1â”œâ”€â”€â”€â”¬â”€â–ºâ”‚Node2â”‚
	//â””â”€â”€â”€â”€â”€â”€â”€â”˜   â”‚   â””â”€â”€â”€â”€â”€â”˜   â”‚  â””â”€â”€â”€â”€â”€â”˜
	//            â”‚             â”‚
	//            â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
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
		const runData: IRunData = {
			[trigger.name]: [toITaskData([{ data: { value: 1 } }])],
			[node1.name]: [toITaskData([{ data: { value: 1 } }])],
		};
		const pinData: IPinData = {};

		// ACT
		const startNodes = findStartNodes({
			graph,
			trigger,
			destination: node2,
			runData,
			pinData,
		});

		// ASSERT
		expect(startNodes.size).toBe(1);
		expect(startNodes).toContainEqual(node2);
	});

	describe('pinData', () => {
		//               PD              â–ºâ–º
		// â”Œâ”€â”€â”€â”€â”€â”€â”€â”1   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”0   â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
		// â”‚triggerâ”œâ”€â”€â”€â”€â–ºpinnedNodeâ”œâ”€â”€â”€â”€â–ºdestinationâ”‚
		// â””â”€â”€â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜    â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		test('does not stop recursing when the first node that has no run data has pinned data', () => {
			// ARRANGE
			const trigger = createNodeData({ name: 'trigger' });
			const pinnedNode = createNodeData({ name: 'pinnedNode' });
			const destination = createNodeData({ name: 'destinationNode' });
			const graph = new DirectedGraph()
				.addNodes(trigger, destination, pinnedNode)
				.addConnections({ from: trigger, to: pinnedNode }, { from: pinnedNode, to: destination });
			const pinData: IPinData = { [pinnedNode.name]: [{ json: { value: 1 } }] };
			const runData: IRunData = {
				[trigger.name]: [toITaskData([{ data: { value: 1 } }])],
			};

			// ACT
			const startNodes = findStartNodes({
				graph,
				trigger,
				destination,
				runData,
				pinData,
			});

			// ASSERT
			expect(startNodes.size).toBe(1);
			expect(startNodes).toContain(destination);
		});
	});

	describe('custom loop logic', () => {
		//                       â–ºâ–º
		//             â”Œâ”€â”€â”€â”€â”0  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”
		// â”Œâ”€â”€â”€â”€â”€â”€â”€â”1  â”‚    â”œâ”€â”€â”€â–ºafterLoopâ”‚
		// â”‚triggerâ”œâ”€â”¬â”€â–ºloopâ”‚1  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		// â””â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚    â”œâ”€â” â”Œâ”€â”€â”€â”€â”€â”€â”1
		//           â”‚ â””â”€â”€â”€â”€â”˜ â””â”€â–ºinLoopâ”œâ”€â”€â”
		//           â”‚          â””â”€â”€â”€â”€â”€â”€â”˜  â”‚
		//           â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		//
		test('if the last run of loop node has no data (null) on the done output, then the loop is the start node', () => {
			// ARRANGE
			const trigger = createNodeData({ name: 'trigger' });
			const loop = createNodeData({ name: 'loop', type: 'n8n-nodes-base.splitInBatches' });
			const inLoop = createNodeData({ name: 'inLoop' });
			const afterLoop = createNodeData({ name: 'afterLoop' });
			const graph = new DirectedGraph()
				.addNodes(trigger, loop, inLoop, afterLoop)
				.addConnections(
					{ from: trigger, to: loop },
					{ from: loop, outputIndex: 1, to: inLoop },
					{ from: inLoop, to: loop },
					{ from: loop, to: afterLoop },
				);
			const runData: IRunData = {
				[trigger.name]: [toITaskData([{ data: { name: 'trigger' } }])],
				[loop.name]: [
					// only output on the `loop` branch, but no output on the `done`
					// branch
					toITaskData([{ outputIndex: 1, data: { name: 'loop' } }]),
				],
				[inLoop.name]: [toITaskData([{ data: { name: 'inLoop' } }])],
			};

			// ACT
			const startNodes = findStartNodes({
				graph,
				trigger,
				destination: afterLoop,
				runData,
				pinData: {},
			});

			// ASSERT
			expect(startNodes.size).toBe(1);
			expect(startNodes).toContainEqual(loop);
		});

		//                       â–ºâ–º
		//             â”Œâ”€â”€â”€â”€â”0  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”
		// â”Œâ”€â”€â”€â”€â”€â”€â”€â”1  â”‚    â”œâ”€â”€â”€â–ºafterLoopâ”‚
		// â”‚triggerâ”œâ”€â”¬â”€â–ºloopâ”‚1  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		// â””â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚    â”œâ”€â” â”Œâ”€â”€â”€â”€â”€â”€â”1
		//           â”‚ â””â”€â”€â”€â”€â”˜ â””â”€â–ºinLoopâ”œâ”€â”€â”
		//           â”‚          â””â”€â”€â”€â”€â”€â”€â”˜  â”‚
		//           â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		//
		test('if the last run of loop node has no data (empty array) on the done output, then the loop is the start  node', () => {
			// ARRANGE
			const trigger = createNodeData({ name: 'trigger' });
			const loop = createNodeData({ name: 'loop', type: 'n8n-nodes-base.splitInBatches' });
			const inLoop = createNodeData({ name: 'inLoop' });
			const afterLoop = createNodeData({ name: 'afterLoop' });
			const graph = new DirectedGraph()
				.addNodes(trigger, loop, inLoop, afterLoop)
				.addConnections(
					{ from: trigger, to: loop },
					{ from: loop, outputIndex: 1, to: inLoop },
					{ from: inLoop, to: loop },
					{ from: loop, to: afterLoop },
				);
			const runData: IRunData = {
				[trigger.name]: [toITaskData([{ data: { name: 'trigger' } }])],
				[loop.name]: [
					// This is handcrafted because `toITaskData` does not allow inserting
					// an empty array like the first element of `main` below. But the
					// execution engine creates ITaskData like this.
					{
						executionStatus: 'success',
						executionTime: 0,
						startTime: 0,
						executionIndex: 0,
						source: [],
						data: { main: [[], [{ json: { name: 'loop' } }]] },
					},
				],
				[inLoop.name]: [toITaskData([{ data: { name: 'inLoop' } }])],
			};

			// ACT
			const startNodes = findStartNodes({
				graph,
				trigger,
				destination: afterLoop,
				runData,
				pinData: {},
			});

			// ASSERT
			expect(startNodes.size).toBe(1);
			expect(startNodes).toContainEqual(loop);
		});

		//                       â–ºâ–º
		//             â”Œâ”€â”€â”€â”€â”1  â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”
		// â”Œâ”€â”€â”€â”€â”€â”€â”€â”1  â”‚    â”œâ”€â”€â”€â–ºafterLoopâ”‚
		// â”‚triggerâ”œâ”€â”¬â”€â–ºloopâ”‚1  â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		// â””â”€â”€â”€â”€â”€â”€â”€â”˜ â”‚ â”‚    â”œâ”€â” â”Œâ”€â”€â”€â”€â”€â”€â”1
		//           â”‚ â””â”€â”€â”€â”€â”˜ â””â”€â–ºinLoopâ”œâ”€â”€â”
		//           â”‚          â””â”€â”€â”€â”€â”€â”€â”˜  â”‚
		//           â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
		//
		test('if the loop has data on the done output in the last run it does not become a start node', () => {
			// ARRANGE
			const trigger = createNodeData({ name: 'trigger' });
			const loop = createNodeData({ name: 'loop', type: 'n8n-nodes-base.splitInBatches' });
			const inLoop = createNodeData({ name: 'inLoop' });
			const afterLoop = createNodeData({ name: 'afterLoop' });
			const graph = new DirectedGraph()
				.addNodes(trigger, loop, inLoop, afterLoop)
				.addConnections(
					{ from: trigger, to: loop },
					{ from: loop, outputIndex: 1, to: inLoop },
					{ from: inLoop, to: loop },
					{ from: loop, to: afterLoop },
				);
			const runData: IRunData = {
				[trigger.name]: [toITaskData([{ data: { name: 'trigger' } }])],
				[loop.name]: [
					toITaskData([{ outputIndex: 1, data: { name: 'loop' } }]),
					toITaskData([{ outputIndex: 0, data: { name: 'done' } }]),
				],
				[inLoop.name]: [toITaskData([{ data: { name: 'inLoop' } }])],
			};

			// ACT
			const startNodes = findStartNodes({
				graph,
				trigger,
				destination: afterLoop,
				runData,
				pinData: {},
			});

			// ASSERT
			expect(startNodes.size).toBe(1);
			expect(startNodes).toContainEqual(afterLoop);
		});
	});
});
