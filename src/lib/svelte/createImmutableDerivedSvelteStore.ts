import type * as SvelteStore from "svelte/store";

export function createImmutableDerivedSvelteStore<StoreValue, SourceStoreValue>(
	sourceStore: SvelteStore.Readable<SourceStoreValue>,
	computeDerivedValue: (sourceStoreValue: SourceStoreValue) => StoreValue,
): SvelteStore.Readable<StoreValue> {
	const subscribers = new Set<SvelteStore.Subscriber<StoreValue>>();

	let resolveNotifyNewSubscriber: (
		newSubscriber: SvelteStore.Subscriber<StoreValue>,
	) => void = () => {
		// Do nothing.
	};

	let resolveSourceStoreValue: (sourceStoreValue: SourceStoreValue) => void = (
		initialSourceStoreValue: SourceStoreValue,
	): void => {
		const derivedValue = computeDerivedValue(initialSourceStoreValue);

		let currentDerivedValue = derivedValue;

		const notifySubscribers = (): void => {
			subscribers.forEach((subscriber) => {
				subscriber(currentDerivedValue);
			});
		};

		notifySubscribers();

		resolveNotifyNewSubscriber = (newSubscriber: SvelteStore.Subscriber<StoreValue>): void => {
			newSubscriber(currentDerivedValue);
		};

		resolveSourceStoreValue = (newSourceStoreValue: SourceStoreValue): void => {
			const newDerivedValue = computeDerivedValue(newSourceStoreValue);

			if (!Object.is(currentDerivedValue, newDerivedValue)) {
				currentDerivedValue = newDerivedValue;

				notifySubscribers();
			}
		};
	};

	sourceStore.subscribe((sourceStoreValue) => {
		resolveSourceStoreValue(sourceStoreValue);
	});

	const subscribe = (subscriber: SvelteStore.Subscriber<StoreValue>): SvelteStore.Unsubscriber => {
		subscribers.add(subscriber);

		resolveNotifyNewSubscriber(subscriber);

		const unsubscribe = (): void => {
			subscribers.delete(subscriber);
		};

		return unsubscribe;
	};

	return {
		subscribe,
	};
}
