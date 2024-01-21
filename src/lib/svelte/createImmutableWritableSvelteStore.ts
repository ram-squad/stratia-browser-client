import type * as SvelteStore from "svelte/store";

export function createImmutableWritableSvelteStore<StoreValue>(
	initialValue: StoreValue,
): SvelteStore.Writable<StoreValue> {
	let currentValue = initialValue;

	const subscribers = new Set<SvelteStore.Subscriber<StoreValue>>();

	const notifySubscribers = (): void => {
		subscribers.forEach((subscriber): void => {
			subscriber(currentValue);
		});
	};

	const set = (newValue: StoreValue): void => {
		if (!Object.is(currentValue, newValue)) {
			currentValue = newValue;

			notifySubscribers();
		}
	};

	const update = (updater: SvelteStore.Updater<StoreValue>): void => {
		const newValue = updater(currentValue);

		set(newValue);
	};

	const subscribe = (subscriber: SvelteStore.Subscriber<StoreValue>): SvelteStore.Unsubscriber => {
		subscribers.add(subscriber);

		subscriber(currentValue);

		const unsubscribe = (): void => {
			subscribers.delete(subscriber);
		};

		return unsubscribe;
	};

	return {
		set,
		subscribe,
		update,
	};
}
