import { mount, hydrate, type Component } from 'svelte';

// Updated version with optional props
export default function mountToNode<T extends Component<any>>(
	Component: T,
	Id: string,
	props?: Record<string, unknown> // Optional props parameter
) {
	const target = document.getElementById(Id);

	if (!target) {
		throw new Error(`Element with ID "${Id}" not found`);
	}

	mount(Component, {
		target: target,
		props: props // Handle undefined case with empty object
	});
}
