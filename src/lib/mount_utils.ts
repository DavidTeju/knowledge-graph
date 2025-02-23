import { mount, type Component } from 'svelte';

// Updated version with optional props
export function mountToNode<T extends Component>(
	component: T,
	Id: string,
	props?: Record<string, unknown> // Optional props parameter
) {
	const target = document.getElementById(Id);

	if (!target) {
		throw new Error(`Element with ID "${Id}" not found`);
	}

	mount(component, {
		target: target,
		props: props // Handle undefined case with empty object
	});
}

export function mountToEdge(nodelink: any) {
	console.log(nodelink);
}
