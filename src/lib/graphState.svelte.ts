import type { SerializableGraph } from '$lib/graph_types';
import { Node } from '$lib/graph_types';
import { SvelteMap } from 'svelte/reactivity';

const sampleSerializedGraph: SerializableGraph = {
	nodes: [
		{
			id: 'einstein',
			identifiers: ['einstein', 'Albert Einstein', 'Einstein'],
			description:
				'German-born theoretical physicist, widely known for developing the theory of relativity',
			data: {
				birth: '1879',
				death: '1955',
				field: 'Physics',
				nationality: 'German'
			}
		},
		{
			id: 'relativity',
			identifiers: [
				'relativity',
				'Theory of Relativity',
				'Special Relativity',
				'General Relativity'
			],
			description:
				'Physics theory describing relationship between space, time, gravity, and matter',
			data: {
				year: '1915',
				type: 'scientific_theory',
				field: 'Physics'
			}
		},
		{
			id: 'curie',
			identifiers: ['curie', 'Marie Curie', 'Marie Skłodowska-Curie'],
			description:
				'Polish-French physicist and chemist who conducted pioneering research on radioactivity',
			data: {
				birth: '1867',
				death: '1934',
				fields: ['Physics', 'Chemistry'],
				nationality: 'Polish-French'
			}
		},
		{
			id: 'radioactivity',
			identifiers: ['radioactivity', 'Radioactive decay'],
			description: 'Process by which an unstable atomic nucleus loses energy by radiation',
			data: {
				type: 'physical_phenomenon',
				field: 'Nuclear physics'
			}
		},
		{
			id: 'radium',
			identifiers: ['radium', 'Ra', 'Element 88'],
			description: 'Chemical element with atomic number 88',
			data: {
				atomic_number: 88,
				type: 'chemical_element',
				discovery_year: '1898'
			}
		},
		{
			id: 'darwin',
			identifiers: ['darwin', 'Charles Darwin', 'Charles Robert Darwin'],
			description: 'English naturalist, geologist and biologist, known for evolutionary theory',
			data: {
				birth: '1809',
				death: '1882',
				field: 'Biology',
				nationality: 'English'
			}
		},
		{
			id: 'evolution',
			identifiers: ['evolution', 'Theory of Evolution', 'Natural Selection'],
			description: 'Theory explaining how organisms change over time through natural selection',
			data: {
				year: '1859',
				type: 'scientific_theory',
				field: 'Biology'
			}
		},
		{
			id: 'modern_biology',
			identifiers: ['modern biology'],
			description: 'The contemporary study of living organisms, influenced by evolutionary theory',
			data: {
				field: 'Biology'
			}
		},
		{
			id: 'modern_physics',
			identifiers: ['modern physics'],
			description:
				'Branch of physics that emerged after classical physics, influenced by relativity and quantum mechanics',
			data: {
				field: 'Physics'
			}
		},
		{
			id: 'nuclear_medicine',
			identifiers: ['nuclear medicine'],
			description: 'Medical specialty using radioactive substances for diagnosis and treatment',
			data: {
				field: 'Medicine'
			}
		}
	],
	edges: [
		{
			relation: 'discovered',
			source: 'einstein',
			target: 'relativity'
		},
		{
			relation: 'discovered',
			source: 'curie',
			target: 'radioactivity'
		},
		{
			relation: 'discovered',
			source: 'curie',
			target: 'radium'
		},
		{
			relation: 'collaborated_with',
			source: 'curie',
			target: 'darwin'
		},
		{
			relation: 'developed',
			source: 'darwin',
			target: 'evolution'
		},
		{
			relation: 'influenced',
			source: 'evolution',
			target: 'modern_biology'
		},
		{
			relation: 'revolutionized',
			source: 'relativity',
			target: 'modern_physics'
		},
		{
			relation: 'led_to',
			source: 'radioactivity',
			target: 'nuclear_medicine'
		}
		// --
		// --
		// --
		// --
		// {
		// 	"relation": "influenced",
		// 	"source": "modern_physics",
		// 	"target": "modern_biology"
		// },
		// {
		// 	"relation": "contributed_to",
		// 	"source": "radioactivity",
		// 	"target": "modern_physics"
		// },
		// {
		// 	"relation": "influenced",
		// 	"source": "evolution",
		// 	"target": "nuclear_medicine"
		// }
	]
};

// const sampleGraph = Node.buildGraph(sampleSerializedGraph);

export const graph = $state<{ head: Node | null; nodeMap: Map<string, Node> | null }>(
	{ head: null, nodeMap: null }
	// {
	// head: sampleGraph.head,
	// nodeMap: new SvelteMap(sampleGraph.nodeMap)
	// }
);
