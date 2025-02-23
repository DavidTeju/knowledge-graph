import type { Actions } from './$types';
import { ChatOpenAI } from '@langchain/openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { relationshipsMessage, synonymMessage, titleAndDescriptionMessage } from '$lib/agents';
import { Node } from '$lib/graph_types';

const model = new ChatOpenAI({ model: 'gpt-4', apiKey: OPENAI_API_KEY });

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
	}
} satisfies Actions;
