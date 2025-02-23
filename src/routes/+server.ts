import {
	model,
	relationshipsMessage,
	type ResearchContext,
	synonymMessage,
	titleAndDescriptionMessage
} from '$lib/agents';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const context: ResearchContext = await request.json();

	const { content: titleDescriptionContent } = await model.invoke(
		titleAndDescriptionMessage(context.mainTopic, context)
	);
	const titleDescription = JSON.parse(titleDescriptionContent);
	const promptTitle = titleDescription.title;
	const description = titleDescription.description;

	const { content: synonymContent } = await model.invoke(synonymMessage(promptTitle, context));
	const identifiers: Array<string> = JSON.parse(synonymContent)['keywords'];

	const { content: relationshipsContent } = await model.invoke(
		relationshipsMessage(identifiers, context)
	);
	const relationships: Array<{
		relationship: string;
		target: string;
	}> = JSON.parse(relationshipsContent)['relationships'];

	return json(
		{
			relationships,
			identifiers,
			description,
			prompt: context.mainTopic
		},
		{
			status: 201
		}
	);
}
