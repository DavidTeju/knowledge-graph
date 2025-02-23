import type { Actions } from './$types';
import { ChatOpenAI } from '@langchain/openai';
import {
	model,
	relationshipsMessage, type ResearchContext,
	synonymMessage,
	titleAndDescriptionMessage
} from '$lib/agents';
import { Node } from '$lib/graph_types';


export const actions = {
	initializeResearch: async ({ request }) => {
		const formData = await request.formData();

		const input = (formData.get('prompt') as string).trim();
		// look at type

		const { content: titleDescriptionContent } = await model.invoke(titleAndDescriptionMessage(input));
		const titleDescription = JSON.parse(titleDescriptionContent);
		const promptTitle = titleDescription.title;
		const description = titleDescription.description;

		const { content: content1 } = await model.invoke(synonymMessage(promptTitle));
		const identifiers: Array<string> = JSON.parse(content1)['keywords'];

		const { content: content2 } = await model.invoke(relationshipsMessage(identifiers));

		const relationships: Array<{
			relationship: string;
			target: string;
		}> = JSON.parse(content2)['relationships'];

		const head = new Node({ name: promptTitle, description });
		head.identifiers.push(...identifiers);
		for (const { relationship, target } of relationships) {
			head.createEdge(target, relationship);
		}

		return {
			nodeRels: head.extractGraph(),
			prompt: input
		};
	},
} satisfies Actions;
