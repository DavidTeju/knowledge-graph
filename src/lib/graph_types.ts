class Edge {
	constructor(
		public source: Node,
		public target: Node,
		public relation: string
	) {}
}

export class Node {
	public id: string;
	public identifiers: string[];
	public description: string;
	public data: object;
	public edges: Set<Edge>;

	constructor({
		name,
		identifiers = [name],
		description = '',
		data = {},
		edges = new Set<Edge>()
	}: {
		name: string;
		identifiers?: string[];
		description?: string;
		data?: object;
		edges?: Set<Edge>;
	}) {
		this.id = name;
		this.identifiers = identifiers;
		if (!this.identifiers.includes(name)) {
			this.identifiers.push(name);
		}
		this.description = description;
		this.data = data;
		this.edges = edges;
	}

	createEdge(targetNodeName: string, relationship: string) {
		// TODO: check if edge/node already exists
		const otherNode = new Node({ name: targetNodeName });
		const edge = new Edge(this, otherNode, relationship);
		this.edges.add(edge);
		otherNode.edges.add(edge);

		return edge;
	}

	addEdge(targetNode: Node, relation: string) {
		const edge = new Edge(this, targetNode, relation);
		this.edges.add(edge);
		targetNode.edges.add(edge);
	}

	toString() {
		return JSON.stringify(
			{
				identifiers: this.identifiers,
				description: this.description,
				data: this.data,
				edges: this.edges.values().map(({ source, target, relation }) => ({
					source: source.identifiers,
					target: target.identifiers,
					relation
				}))
			},
			null,
			4
		);
	}

	extractGraph() {
		const graph: SerializableGraph = {
			nodes: [],
			edges: []
		};
		// it's a dag so do we really need seenNodes?
		const seenNodes = new Set<string>();
		const queue: Array<Node> = [this]; // head is always the root node
		while (queue.length > 0) {
			const node = queue.pop()!; // safe because of while loop condition
			if (seenNodes.has(node.id)) {
				continue;
			}
			const { edges: _, ...nodeWithoutEdges } = node;
			graph.nodes.push(nodeWithoutEdges);
			for (const { relation, source, target } of node.edges) {
				if (!(seenNodes.has(target.id) || seenNodes.has(source.id))) {
					graph.edges.push({ relation: relation, source: source.id, target: target.id });
				}
				if (!seenNodes.has(target.id) && target !== node) queue.push(target);
				if (!seenNodes.has(source.id) && source !== node) queue.push(source);
			}
			seenNodes.add(node.id);
		}
		return graph;
	}

	static buildGraph(graphDef: { nodes: Array<SerializableNode>; edges: Array<SerializableEdge> }): {
		head: Node;
		nodeMap: Map<string, Node>;
	} {
		const nodeMap = new Map<string, Node>();

		for (const nodeDef of graphDef.nodes) {
			const node = new Node({ name: nodeDef.id, ...nodeDef });
			nodeMap.set(nodeDef.id, node);
		}

		for (const edgeDef of graphDef.edges) {
			const sourceNode = nodeMap.get(edgeDef.source);
			const targetNode = nodeMap.get(edgeDef.target);

			if (!sourceNode || !targetNode) {
				throw new Error(`Invalid edge: ${edgeDef.source} -> ${edgeDef.target}`);
			}

			sourceNode.addEdge(targetNode, edgeDef.relation);
		}

		const rootNodeId = graphDef.nodes[0].id;
		const rootNode = nodeMap.get(rootNodeId);

		if (!rootNode) {
			throw new Error('No root node found');
		}

		return { head: rootNode, nodeMap };
	}
}

type SerializableNode = Omit<
	Node,
	'edges' | 'createEdge' | 'extractGraph' | 'addEdge' | 'buildGraph'
>;
type SerializableEdge = Omit<Edge, 'source' | 'target'> & { source: string; target: string };

export type SerializableGraph = {
	nodes: Array<SerializableNode>;
	edges: Array<SerializableEdge>;
};
