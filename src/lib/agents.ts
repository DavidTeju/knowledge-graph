import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { OPENAI_API_KEY } from '$env/static/private';

export const synonymMessage = (prompt: string, context?: ResearchContext) => {
	const synonymMessages = [
		new SystemMessage(`You are part of a knowledge graph builder system. Your unique job is to come up with 1-6 
			keywords, identifiers, labels, or phrases that describe the data/topic the user is prompting on. These keywords will be used
			to ensure uniqueness of knowledge nodes. There already exists another agent that will generate keywords for searching
			relationships and related entities so you must only focus on the main topic. For example, when generating for Abstract Algebra,
			do not return mathematics, another agent will return that and the relationship: "Abstract Algebra is a branch of mathematics".
			Instead, almost think of yourself as a conceptual thesaurus; In this case, one of the keywords could be "Modern Algebra".
			Essentially, you're looking for equalities, synonyms, etc not subcategories or relationships.
		
			
			You must return a JSON object with the following structure:
			{
				"keywords": ["keyword1", "keyword2", "keyword3"],
				"error": "An error message if there is an error"
			}
			
			Your output will be exactly parsed like: const keywords = JSON.parse(output)["keywords"]; so 
			make sure to return the correct structure and no ancillary data or non-JSON data. If there is an error,
			you must return an "error" key with a string value of the error message and keywords as an empty array.
			`),
		new HumanMessage(prompt)
	];

	if (context) {
		synonymMessages.push(wordifyContext(context));
	}

	return synonymMessages;
};

export const relationshipsMessage = (keywords: string[], context?: ResearchContext) => {
	const keywordsAsString = keywords.map((k) => `"${k}"`).join(', ');
	const relationships = [
		new SystemMessage(`You are part of a knowledge graph builder system. Your unique job is to come up with 2-6 
			relationships, connections, or related entities that are associated with the data/topic the user is prompting on.
			These relationships will be used to expand the knowledge graph and provide context to the main topic. 
			You will be provided with a comma seperated list of identifiers for the main topic/data that you are trying to find 
			connections to. Another agent generated these identifiers for the main topic so you must only focus on new
			relationships with new nodes. For example, when generating for "Abstract Algebra, Mordern Algebra", do 
			not return synonyms, instead, return relationships like "Group theory is a branch of mathematics" and
			other interesting adjacent topics.
			
			You must return a JSON object with the following structure:
			{
				"relationships": [
					{
						"relationship": "is a",
						"target": "someKeyword"
					},
					{
						"relationship": "was invented by",
						"target": "somePersonName"
					}
				],
				"error": "An error message if there is an error"
			}
			
			Your output will be exactly parsed like: const keywords: Array<{ relationship: string, target: string }> 
			= JSON.parse(output)["relationships"]; so make sure to return the correct structure and no ancillary data
			 or non-JSON data. If there is an error, you must return an "error" key with a string value of the error 
			 message and keywords as an empty array.
			`),
		new HumanMessage(keywordsAsString)
	];

	if (context) {
		relationships.push(wordifyContext(context));
	}

	return relationships;
};

const _titleAndDescriptionMessage =
	new SystemMessage(`You are part of a knowledge graph builder system. Your unique job is to best summarize the prompt
	as a title and a description. The title should be a concise, 1-6 word phrase that encapsulates the main topic of the prompt.
	The description should be a longer, 10-50 word paragraph that provides more context and detail about the main topic.
	
	You must return a JSON object with the following structure:
	{
		"title": "Title of the prompt",
		"description": "Description of the prompt",
		"error": "An error message if there is an error"
	}
	
	Your output will be exactly parsed like: const { title, description } = JSON.parse(output); so make sure to return
	the correct structure and no ancillary data or non-JSON data. If there is an error, you must return an "error" key with
	a string value of the error message and title and description as empty strings.
`);

export const titleAndDescriptionMessage = (prompt: string, context?: ResearchContext) => {
	// add context to the message if it exists
	const messages = [_titleAndDescriptionMessage, new HumanMessage(prompt)];
	if (context) {
		messages.push(wordifyContext(context));
	}

	return messages;
};

function wordifyContext(context: ResearchContext) {
	return new HumanMessage(`Consider the following context to help you better understand my topic.
		${JSON.stringify(context)}`);
}

export type ResearchContext = {
	mainTopic: string;
	identifiers: string[];
	description: string;
	adjacencies: string[];
};

export const model = new ChatOpenAI({ model: 'gpt-4', apiKey: OPENAI_API_KEY });
