import type { Actions } from './$types';
import { ChatOpenAI } from '@langchain/openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { relationshipsMessage, synonymMessage, titleAndDescriptionMessage } from '$lib/agents';

const model = new ChatOpenAI({ model: 'gpt-4', apiKey: OPENAI_API_KEY });

class Edge {
	constructor(
		public source: Node,
		public target: Node,
		public name: string
	) {}
}

class Node {
	public name: string;
	public identifiers: string[];
	public description: string;
	public data: object;
	public edges: Edge[];

	constructor({
		name,
		identifiers = [name],
		description = '',
		data = {},
		edges = []
	}: {
		name: string;
		identifiers?: string[];
		description?: string;
		data?: object;
		edges?: Edge[];
	}) {
		this.name = name;
		this.identifiers = identifiers;
		this.description = description;
		this.data = data;
		this.edges = edges;
	}

	addEdge(nodeName: string, relationship: string) {
		// TODO: check if edge/node already exists
		const otherNode = new Node({ name: nodeName });
		const edge = new Edge(this, otherNode, relationship);
		this.edges.push(edge);
		otherNode.edges.push(edge);
	}

	toString() {
		return JSON.stringify(
			{
				identifiers: this.identifiers,
				description: this.description,
				data: this.data,
				edges: this.edges.map((edge) => ({
					source: edge.source.identifiers,
					target: edge.target.identifiers,
					name: edge.name
				}))
			},
			null,
			4
		);
	}

	extractGraph() {
		const graph: {
			nodes: Array<Omit<Node, 'edges' | 'addEdge' | 'extractGraph'>>;
			edges: Array<{ name: string; source: string; target: string }>;
		} = {
			nodes: [],
			edges: []
		};
		// it's a dag so do we really need seenNodes?
		const seenNodes = new Set<Node>();
		const queue: Array<Node> = [this];
		while (queue.length > 0) {
			const node = queue.pop()!; // safe because of while loop condition
			if (seenNodes.has(node)) {
				continue;
			}
			seenNodes.add(node);
			const { edges: _, ...nodeWithoutEdges } = node;
			graph.nodes.push(nodeWithoutEdges);
			for (const edge of node.edges) {
				graph.edges.push({ name: edge.name, source: edge.source.name, target: edge.target.name });
				queue.push(edge.target);
			}
		}
		return graph;
	}
}

export const actions = {
	fetchData: async ({ request }) => {
		const formData = await request.formData();

		const input = (formData.get('prompt') as string).trim();
		// look at type

		let promptTitle = input;
		let description = 'Change me!';
		if (input.length > 100 || input.split(' ').length > 20) {
			const { content } = await model.invoke(titleAndDescriptionMessage(input));
			const parsed = JSON.parse(content);
			promptTitle = parsed.title;
			description = parsed.description;
		}

		const head = new Node({ name: promptTitle, description });

		const { content: content1 } = await model.invoke(synonymMessage(promptTitle));
		const asArray: Array<string> = JSON.parse(content1)['keywords'];

		head.identifiers.push(...asArray);

		const { content: content2 } = await model.invoke(relationshipsMessage(asArray));

		const relationships: Array<{
			relationship: string;
			target: string;
		}> = JSON.parse(content2)['relationships'];

		for (const { relationship, target } of relationships) {
			head.addEdge(target, relationship);
		}

		console.log(head.toString());
		console.log(JSON.stringify(head.extractGraph(), null, 4));

		return {
			data: JSON.stringify({ promptTitle, description, asArray, relationships }, null, 4),
			input
		};
	}
} satisfies Actions;
