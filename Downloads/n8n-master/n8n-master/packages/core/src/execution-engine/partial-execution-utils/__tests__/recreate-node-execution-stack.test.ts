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

import { AssertionError } from 'assert';
import type {
	INodeExecutionData,
	ISourceData,
	IWaitingForExecution,
	IWaitingForExecutionSource,
	IPinData,
	IRunData,
} from 'workflow-automation-workflow';
import { NodeConnectionTypes } from 'workflow-automation-workflow';

import { createNodeData, toITaskData } from './helpers';
import { DirectedGraph } from '../directed-graph';
import { findSubgraph } from '../find-subgraph';
import {
	addWaitingExecution,
	addWaitingExecutionSource,
	recreateNodeExecutionStack,
} from '../recreate-node-execution-stack';

describe('recreateNodeExecutionStack', () => {
	//                   â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”1      â”Œâ”€â”€â”€â”€â”
	//  â”‚Triggerâ”œâ”€â”€â”€â”€â”€â”€â–ºâ”‚Nodeâ”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜       â””â”€â”€â”€â”€â”˜
	test('all nodes except destination node have data', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node = createNodeData({ name: 'node' });

		const graph = new DirectedGraph()
			.addNodes(trigger, node)
			.addConnections({ from: trigger, to: node });

		const workflow = findSubgraph({ graph, destination: node, trigger });
		const startNodes = new Set([node]);
		const runData: IRunData = {
			[trigger.name]: [toITaskData([{ data: { value: 1 } }])],
		};
		const pinData = {};

		// ACT
		const { nodeExecutionStack, waitingExecution, waitingExecutionSource } =
			recreateNodeExecutionStack(workflow, startNodes, runData, pinData);

		// ASSERT
		expect(nodeExecutionStack).toHaveLength(1);
		expect(nodeExecutionStack).toEqual([
			{
				data: { main: [[{ json: { value: 1 } }]] },
				node,
				source: {
					main: [
						{
							// TODO: not part of ISourceDate, but maybe it should be?
							//currentNodeInput: 0,
							previousNode: 'trigger',
							previousNodeOutput: 0,
							previousNodeRun: 0,
						},
					],
				},
			},
		]);
		expect(waitingExecution).toEqual({});
		expect(waitingExecutionSource).toEqual({});
	});

	//                   â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”0      â”Œâ”€â”€â”€â”€â”
	//  â”‚Triggerâ”œâ”€â”€â”€â”€â”€â”€â–ºâ”‚Nodeâ”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜       â””â”€â”€â”€â”€â”˜
	test('no nodes have data', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node = createNodeData({ name: 'node' });

		const workflow = new DirectedGraph()
			.addNodes(trigger, node)
			.addConnections({ from: trigger, to: node });
		const startNodes = new Set([trigger]);
		const runData: IRunData = {};
		const pinData: IPinData = {};

		// ACT
		const { nodeExecutionStack, waitingExecution, waitingExecutionSource } =
			recreateNodeExecutionStack(workflow, startNodes, runData, pinData);

		// ASSERT
		expect(nodeExecutionStack).toHaveLength(1);
		expect(nodeExecutionStack).toEqual([
			{
				data: { main: [[{ json: {} }]] },
				node: trigger,
				source: null,
			},
		]);

		expect(waitingExecution).toEqual({});
		expect(waitingExecutionSource).toEqual({});
	});

	//  PinData          â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”1      â”Œâ”€â”€â”€â”€â”
	//  â”‚Triggerâ”œâ”€â”€â”€â”€â”€â”€â–ºâ”‚Nodeâ”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜       â””â”€â”€â”€â”€â”˜
	test('node before destination node has pinned data', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node = createNodeData({ name: 'node' });

		const workflow = new DirectedGraph()
			.addNodes(trigger, node)
			.addConnections({ from: trigger, to: node });
		const startNodes = new Set([node]);
		const runData: IRunData = {};
		const pinData: IPinData = {
			[trigger.name]: [{ json: { value: 1 } }],
		};

		// ACT
		const { nodeExecutionStack, waitingExecution, waitingExecutionSource } =
			recreateNodeExecutionStack(workflow, startNodes, runData, pinData);

		// ASSERT
		expect(nodeExecutionStack).toHaveLength(1);
		expect(nodeExecutionStack).toEqual([
			{
				data: { main: [[{ json: { value: 1 } }]] },
				node,
				source: {
					main: [
						{
							// TODO: not part of ISourceDate, but maybe it should be?
							//currentNodeInput: 0,
							previousNode: trigger.name,
							previousNodeRun: 0,
							previousNodeOutput: 0,
						},
					],
				},
			},
		]);

		expect(waitingExecution).toEqual({});
		expect(waitingExecutionSource).toEqual({});
	});

	//                  XX            â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”1     â”Œâ”€â”€â”€â”€â”€â”       â”Œâ”€â”€â”€â”€â”€â”
	//  â”‚Triggerâ”œâ”€â”€â”€â”€â”€â–ºâ”‚Node1â”œâ”€â”€â”€â”€â”€â”€â–ºâ”‚Node2â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜      â””â”€â”€â”€â”€â”€â”˜       â””â”€â”€â”€â”€â”€â”˜
	test('throws if a disabled node is found', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node1 = createNodeData({ name: 'node1', disabled: true });
		const node2 = createNodeData({ name: 'node2' });

		const graph = new DirectedGraph()
			.addNodes(trigger, node1, node2)
			.addConnections({ from: trigger, to: node1 }, { from: node1, to: node2 });

		const startNodes = new Set([node2]);
		const runData: IRunData = {
			[trigger.name]: [toITaskData([{ data: { value: 1 } }])],
		};
		const pinData = {};

		// ACT & ASSERT
		expect(() => recreateNodeExecutionStack(graph, startNodes, runData, pinData)).toThrowError(
			AssertionError,
		);
	});

	//                                â–ºâ–º
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”1     â”Œâ”€â”€â”€â”€â”€â”1      â”Œâ”€â”€â”€â”€â”€â”
	//  â”‚Triggerâ”œâ”€â”€â”¬â”€â”€â–ºâ”‚Node1â”œâ”€â”€â”¬â”€â”€â”€â–ºâ”‚Node3â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚   â””â”€â”€â”€â”€â”€â”˜  â”‚    â””â”€â”€â”€â”€â”€â”˜
	//             â”‚            â”‚
	//             â”‚   â”Œâ”€â”€â”€â”€â”€â”1 â”‚
	//             â””â”€â”€â–ºâ”‚Node2â”œâ”€â”€â”˜
	//                 â””â”€â”€â”€â”€â”€â”˜
	test('multiple incoming connections', () => {
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

		const startNodes = new Set([node3]);
		const runData: IRunData = {
			[trigger.name]: [toITaskData([{ data: { value: 1 } }])],
			[node1.name]: [toITaskData([{ data: { value: 1 } }])],
			[node2.name]: [toITaskData([{ data: { value: 1 } }])],
		};
		const pinData = {};

		// ACT
		const { nodeExecutionStack, waitingExecution, waitingExecutionSource } =
			recreateNodeExecutionStack(graph, startNodes, runData, pinData);

		// ASSERT
		expect(nodeExecutionStack).toEqual([
			{
				data: { main: [[{ json: { value: 1 } }]] },
				node: node3,
				source: {
					main: [
						{
							// TODO: not part of ISourceDate, but maybe it should be?
							//currentNodeInput: 0,
							previousNode: 'node1',
							previousNodeOutput: 0,
							previousNodeRun: 0,
						},
					],
				},
			},
			{
				data: { main: [[{ json: { value: 1 } }]] },
				node: node3,
				source: {
					main: [
						{
							// TODO: not part of ISourceDate, but maybe it should be?
							//currentNodeInput: 0,
							previousNode: 'node2',
							previousNodeOutput: 0,
							previousNodeRun: 0,
						},
					],
				},
			},
		]);

		expect(waitingExecution).toEqual({});
		expect(waitingExecutionSource).toEqual({});
	});

	//                â”Œâ”€â”€â”€â”€â”€â”1       â–ºâ–º
	//             â”Œâ”€â–ºâ”‚node1â”œâ”€â”€â”€â”   â”Œâ”€â”€â”€â”€â”€â”
	//  â”Œâ”€â”€â”€â”€â”€â”€â”€â”1 â”‚  â””â”€â”€â”€â”€â”€â”˜   â””â”€â”€â–ºâ”‚     â”‚
	//  â”‚Triggerâ”œâ”€â”€â”¤                â”‚node3â”‚
	//  â””â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚  â”Œâ”€â”€â”€â”€â”€â”1  â”Œâ”€â”€â–ºâ”‚     â”‚
	//             â””â”€â–ºâ”‚node2â”œâ”€â”€â”€â”˜   â””â”€â”€â”€â”€â”€â”˜
	//                â””â”€â”€â”€â”€â”€â”˜
	test('multiple inputs', () => {
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
				{ from: node1, to: node3, inputIndex: 0 },
				{ from: node2, to: node3, inputIndex: 1 },
			);
		const startNodes = new Set([node3]);
		const runData: IRunData = {
			[trigger.name]: [toITaskData([{ data: { value: 1 } }])],
			[node1.name]: [toITaskData([{ data: { value: 1 } }])],
			[node2.name]: [toITaskData([{ data: { value: 1 } }])],
		};
		const pinData: IPinData = {
			[trigger.name]: [{ json: { value: 1 } }],
		};

		// ACT
		const { nodeExecutionStack, waitingExecution, waitingExecutionSource } =
			recreateNodeExecutionStack(graph, startNodes, runData, pinData);

		// ASSERT
		expect(nodeExecutionStack).toHaveLength(1);
		expect(nodeExecutionStack[0]).toEqual({
			data: { main: [[{ json: { value: 1 } }], [{ json: { value: 1 } }]] },
			node: node3,
			source: {
				main: [
					{ previousNode: 'node1', previousNodeOutput: 0, previousNodeRun: 0 },
					{ previousNode: 'node2', previousNodeOutput: 0, previousNodeRun: 0 },
				],
			},
		});

		expect(waitingExecution).toEqual({});
		expect(waitingExecutionSource).toEqual({});
	});

	//               â”Œâ”€â”€â”€â”€â”€â”           â”Œâ”€â”€â”€â”€â”€â”
	//            â”Œâ”€â”€â–ºnode1â”¼â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â–º     â”‚
	//            â”‚  â””â”€â”€â”€â”€â”€â”˜    â”‚      â”‚mergeâ”‚
	//            â”‚             â”‚  â”Œâ”€â”€â”€â–º     â”‚
	//            â”œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜  â”‚   â””â”€â”€â”€â”€â”€â”˜
	//            â”‚                â”‚
	//â”Œâ”€â”€â”€â”€â”€â”€â”€â”   â”‚    â”Œâ”€â”€â”€â”€â”€â”     â”‚
	//â”‚triggerâ”œâ”€â”€â”€â”´â”€â”€â”€â”€â–ºnode2â”œâ”€â”€â”€â”€â”€â”˜
	//â””â”€â”€â”€â”€â”€â”€â”€â”˜        â””â”€â”€â”€â”€â”€â”˜
	describe('multiple inputs', () => {
		// ARRANGE
		const trigger = createNodeData({ name: 'trigger' });
		const node1 = createNodeData({ name: 'node1' });
		const node2 = createNodeData({ name: 'node2' });
		const merge = createNodeData({ name: 'merge' });
		const graph = new DirectedGraph()
			.addNodes(trigger, node1, node2, merge)
			.addConnections(
				{ from: trigger, to: node1 },
				{ from: trigger, to: node2 },
				{ from: trigger, to: merge, inputIndex: 0 },
				{ from: node1, to: merge, inputIndex: 0 },
				{ from: node2, to: merge, inputIndex: 1 },
			);

		test('only the trigger has run data', () => {
			// ARRANGE
			const runData: IRunData = {
				[trigger.name]: [toITaskData([{ data: { node: 'trigger' } }])],
			};
			const pinData: IPinData = {};
			const startNodes = new Set([node1, node2, merge]);

			// ACT
			const { nodeExecutionStack, waitingExecution, waitingExecutionSource } =
				recreateNodeExecutionStack(graph, startNodes, runData, pinData);

			// ASSERT
			expect(nodeExecutionStack).toHaveLength(2);
			expect(nodeExecutionStack[0]).toEqual({
				node: node1,
				data: { main: [[{ json: { node: 'trigger' } }]] },
				source: { main: [{ previousNode: 'trigger', previousNodeOutput: 0, previousNodeRun: 0 }] },
			});
			expect(nodeExecutionStack[1]).toEqual({
				node: node2,
				data: { main: [[{ json: { node: 'trigger' } }]] },
				source: { main: [{ previousNode: 'trigger', previousNodeOutput: 0, previousNodeRun: 0 }] },
			});

			expect(waitingExecution).toEqual({
				[merge.name]: {
					'0': {
						main: [[{ json: { node: 'trigger' } }]],
					},
				},
			});
			expect(waitingExecutionSource).toEqual({
				[merge.name]: {
					'0': {
						main: [
							{
								previousNode: 'trigger',
								previousNodeOutput: 0,
								previousNodeRun: 0,
							},
						],
					},
				},
			});
		});

		test('the trigger and node1 have run data', () => {
			// ARRANGE
			const runData: IRunData = {
				[trigger.name]: [toITaskData([{ data: { node: 'trigger' } }])],
				[node1.name]: [toITaskData([{ data: { node: 'node1' } }])],
			};
			const pinData: IPinData = {};
			const startNodes = new Set([node2, merge]);

			// ACT
			const { nodeExecutionStack, waitingExecution, waitingExecutionSource } =
				recreateNodeExecutionStack(graph, startNodes, runData, pinData);

			// ASSERT
			expect(nodeExecutionStack).toHaveLength(2);
			expect(nodeExecutionStack[0]).toEqual({
				node: node2,
				data: { main: [[{ json: { node: 'trigger' } }]] },
				source: { main: [{ previousNode: 'trigger', previousNodeOutput: 0, previousNodeRun: 0 }] },
			});
			expect(nodeExecutionStack[1]).toEqual({
				node: merge,
				data: { main: [[{ json: { node: 'trigger' } }]] },
				source: {
					main: [{ previousNode: 'trigger', previousNodeOutput: 0, previousNodeRun: 0 }],
				},
			});

			expect(waitingExecution).toEqual({
				[merge.name]: {
					'0': {
						main: [[{ json: { node: 'node1' } }]],
					},
				},
			});
			expect(waitingExecutionSource).toEqual({
				[merge.name]: {
					'0': {
						main: [
							{
								previousNode: 'node1',
								previousNodeOutput: 0,
								previousNodeRun: 0,
							},
						],
					},
				},
			});
		});

		test('the trigger and node2 have run data', () => {
			// ARRANGE
			const runData: IRunData = {
				[trigger.name]: [toITaskData([{ data: { node: 'trigger' } }])],
				[node2.name]: [toITaskData([{ data: { node: 'node2' } }])],
			};
			const pinData: IPinData = {};
			const startNodes = new Set([node1, merge]);

			// ACT
			const { nodeExecutionStack, waitingExecution, waitingExecutionSource } =
				recreateNodeExecutionStack(graph, startNodes, runData, pinData);

			// ASSERT
			expect(nodeExecutionStack).toHaveLength(2);
			expect(nodeExecutionStack[0]).toEqual({
				node: node1,
				data: { main: [[{ json: { node: 'trigger' } }]] },
				source: { main: [{ previousNode: 'trigger', previousNodeOutput: 0, previousNodeRun: 0 }] },
			});
			expect(nodeExecutionStack[1]).toEqual({
				node: merge,
				data: { main: [[{ json: { node: 'trigger' } }], [{ json: { node: 'node2' } }]] },
				source: {
					main: [
						{ previousNode: 'trigger', previousNodeOutput: 0, previousNodeRun: 0 },
						{ previousNode: 'node2', previousNodeOutput: 0, previousNodeRun: 0 },
					],
				},
			});

			expect(waitingExecution).toEqual({});
			expect(waitingExecutionSource).toEqual({});
		});

		test('the trigger, node1 and node2 have run data', () => {
			// ARRANGE
			const runData: IRunData = {
				[trigger.name]: [toITaskData([{ data: { node: 'trigger' } }])],
				[node1.name]: [toITaskData([{ data: { node: 'node1' } }])],
				[node2.name]: [toITaskData([{ data: { node: 'node2' } }])],
			};
			const pinData: IPinData = {};
			const startNodes = new Set([merge]);

			// ACT
			const { nodeExecutionStack, waitingExecution, waitingExecutionSource } =
				recreateNodeExecutionStack(graph, startNodes, runData, pinData);

			// ASSERT
			expect(nodeExecutionStack).toHaveLength(2);
			expect(nodeExecutionStack[0]).toEqual({
				node: merge,
				data: { main: [[{ json: { node: 'node1' } }], [{ json: { node: 'node2' } }]] },
				source: {
					main: [
						{ previousNode: 'node1', previousNodeOutput: 0, previousNodeRun: 0 },
						{ previousNode: 'node2', previousNodeOutput: 0, previousNodeRun: 0 },
					],
				},
			});
			expect(nodeExecutionStack[1]).toEqual({
				node: merge,
				data: { main: [[{ json: { node: 'trigger' } }]] },
				source: {
					main: [{ previousNode: 'trigger', previousNodeOutput: 0, previousNodeRun: 0 }],
				},
			});

			expect(waitingExecution).toEqual({});
			expect(waitingExecutionSource).toEqual({});
		});
	});
});

describe('addWaitingExecution', () => {
	test('allow adding data partially', () => {
		const waitingExecution: IWaitingForExecution = {};
		const nodeName1 = 'node 1';
		const nodeName2 = 'node 2';
		const executionData: INodeExecutionData[] = [{ json: { item: 1 } }, { json: { item: 2 } }];

		// adding the data for the second input index first
		{
			addWaitingExecution(
				waitingExecution,
				nodeName1,
				1, // runIndex
				NodeConnectionTypes.Main,
				1, // inputIndex
				executionData,
			);
			expect(waitingExecution).toEqual({
				[nodeName1]: {
					// runIndex
					1: {
						[NodeConnectionTypes.Main]: [undefined, executionData],
					},
				},
			});
		}

		// adding the data for the first input
		{
			addWaitingExecution(
				waitingExecution,
				nodeName1,
				1, // runIndex
				NodeConnectionTypes.Main,
				0, // inputIndex
				executionData,
			);
			expect(waitingExecution).toEqual({
				[nodeName1]: {
					// runIndex
					1: {
						[NodeConnectionTypes.Main]: [executionData, executionData],
					},
				},
			});
		}

		// adding data for another node connection type
		{
			addWaitingExecution(
				waitingExecution,
				nodeName1,
				1, // runIndex
				NodeConnectionTypes.AiMemory,
				0, // inputIndex
				executionData,
			);
			expect(waitingExecution).toEqual({
				[nodeName1]: {
					// runIndex
					1: {
						[NodeConnectionTypes.Main]: [executionData, executionData],
						[NodeConnectionTypes.AiMemory]: [executionData],
					},
				},
			});
		}

		// adding data for another run
		{
			addWaitingExecution(
				waitingExecution,
				nodeName1,
				0, // runIndex
				NodeConnectionTypes.AiChain,
				0, // inputIndex
				executionData,
			);
			expect(waitingExecution).toEqual({
				[nodeName1]: {
					// runIndex
					0: {
						[NodeConnectionTypes.AiChain]: [executionData],
					},
					1: {
						[NodeConnectionTypes.Main]: [executionData, executionData],
						[NodeConnectionTypes.AiMemory]: [executionData],
					},
				},
			});
		}

		// adding data for another node
		{
			addWaitingExecution(
				waitingExecution,
				nodeName2,
				0, // runIndex
				NodeConnectionTypes.Main,
				2, // inputIndex
				executionData,
			);
			expect(waitingExecution).toEqual({
				[nodeName1]: {
					// runIndex
					0: {
						[NodeConnectionTypes.AiChain]: [executionData],
					},
					1: {
						[NodeConnectionTypes.Main]: [executionData, executionData],
						[NodeConnectionTypes.AiMemory]: [executionData],
					},
				},
				[nodeName2]: {
					// runIndex
					0: {
						[NodeConnectionTypes.Main]: [undefined, undefined, executionData],
					},
				},
			});
		}

		// allow adding null
		{
			addWaitingExecution(
				waitingExecution,
				nodeName2,
				0, // runIndex
				NodeConnectionTypes.Main,
				0, // inputIndex
				null,
			);
			expect(waitingExecution).toEqual({
				[nodeName2]: {
					// runIndex
					0: {
						[NodeConnectionTypes.Main]: [null, undefined, executionData],
					},
				},
				[nodeName1]: {
					// runIndex
					0: {
						[NodeConnectionTypes.AiChain]: [executionData],
					},
					1: {
						[NodeConnectionTypes.Main]: [executionData, executionData],
						[NodeConnectionTypes.AiMemory]: [executionData],
					},
				},
			});
		}
	});
});

describe('addWaitingExecutionSource', () => {
	test('allow adding data partially', () => {
		const waitingExecutionSource: IWaitingForExecutionSource = {};
		const nodeName1 = 'node 1';
		const nodeName2 = 'node 2';
		const sourceData: ISourceData = {
			previousNode: 'node 0',
			previousNodeRun: 0,
			previousNodeOutput: 0,
		};

		// adding the data for the second input index first
		{
			addWaitingExecutionSource(
				waitingExecutionSource,
				nodeName1,
				1, // runIndex
				NodeConnectionTypes.Main,
				1, // inputIndex
				sourceData,
			);
			expect(waitingExecutionSource).toEqual({
				[nodeName1]: {
					// runIndex
					1: {
						[NodeConnectionTypes.Main]: [undefined, sourceData],
					},
				},
			});
		}

		// adding the data for the first input
		{
			addWaitingExecutionSource(
				waitingExecutionSource,
				nodeName1,
				1, // runIndex
				NodeConnectionTypes.Main,
				0, // inputIndex
				sourceData,
			);
			expect(waitingExecutionSource).toEqual({
				[nodeName1]: {
					// runIndex
					1: {
						[NodeConnectionTypes.Main]: [sourceData, sourceData],
					},
				},
			});
		}

		// adding data for another node connection type
		{
			addWaitingExecutionSource(
				waitingExecutionSource,
				nodeName1,
				1, // runIndex
				NodeConnectionTypes.AiMemory,
				0, // inputIndex
				sourceData,
			);
			expect(waitingExecutionSource).toEqual({
				[nodeName1]: {
					// runIndex
					1: {
						[NodeConnectionTypes.Main]: [sourceData, sourceData],
						[NodeConnectionTypes.AiMemory]: [sourceData],
					},
				},
			});
		}

		// adding data for another run
		{
			addWaitingExecutionSource(
				waitingExecutionSource,
				nodeName1,
				0, // runIndex
				NodeConnectionTypes.AiChain,
				0, // inputIndex
				sourceData,
			);
			expect(waitingExecutionSource).toEqual({
				[nodeName1]: {
					// runIndex
					0: {
						[NodeConnectionTypes.AiChain]: [sourceData],
					},
					1: {
						[NodeConnectionTypes.Main]: [sourceData, sourceData],
						[NodeConnectionTypes.AiMemory]: [sourceData],
					},
				},
			});
		}

		// adding data for another node
		{
			addWaitingExecutionSource(
				waitingExecutionSource,
				nodeName2,
				0, // runIndex
				NodeConnectionTypes.Main,
				2, // inputIndex
				sourceData,
			);
			expect(waitingExecutionSource).toEqual({
				[nodeName1]: {
					// runIndex
					0: {
						[NodeConnectionTypes.AiChain]: [sourceData],
					},
					1: {
						[NodeConnectionTypes.Main]: [sourceData, sourceData],
						[NodeConnectionTypes.AiMemory]: [sourceData],
					},
				},
				[nodeName2]: {
					// runIndex
					0: {
						[NodeConnectionTypes.Main]: [undefined, undefined, sourceData],
					},
				},
			});
		}

		// allow adding null
		{
			addWaitingExecutionSource(
				waitingExecutionSource,
				nodeName2,
				0, // runIndex
				NodeConnectionTypes.Main,
				0, // inputIndex
				null,
			);
			expect(waitingExecutionSource).toEqual({
				[nodeName1]: {
					// runIndex
					0: {
						[NodeConnectionTypes.AiChain]: [sourceData],
					},
					1: {
						[NodeConnectionTypes.Main]: [sourceData, sourceData],
						[NodeConnectionTypes.AiMemory]: [sourceData],
					},
				},
				[nodeName2]: {
					// runIndex
					0: {
						[NodeConnectionTypes.Main]: [null, undefined, sourceData],
					},
				},
			});
		}
	});
});
