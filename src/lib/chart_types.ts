export interface Node {
	id: string;
	size: number;
	color: string;
}

export interface Link {
	source: string;
	target: string;
	size: number;
	distance: number;
}

export interface GraphData {
	nodes: Node[];
	links: Link[];
}
