export interface Node {
	id: string;
	content: string;
}

export interface Link {
	source: string;
	target: string;
	relation: string;
}

export interface GraphData {
	nodes: Node[];
	links: Link[];
}
