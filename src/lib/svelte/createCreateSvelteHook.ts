export function createCreateSvelteHook<
	CreateHookArgs extends readonly unknown[],
	UpdateHookArgs extends readonly unknown[],
	HookState,
	HookReturnValue,
>({
	computeHookReturnValue,
	computeInitialHookState,
	computeNewHookState,
}: Readonly<{
	computeHookReturnValue: (hookState: HookState) => HookReturnValue;
	computeInitialHookState: ({
		createHookArgs,
		initialUpdateHookArgs,
	}: Readonly<{
		createHookArgs: CreateHookArgs;
		initialUpdateHookArgs: UpdateHookArgs;
	}>) => HookState;
	computeNewHookState: ({
		newUpdateHookArgs,
		oldHookState,
	}: Readonly<{
		newUpdateHookArgs: UpdateHookArgs;
		oldHookState: HookState;
	}>) => HookState;
}>): (...createHookArgs: CreateHookArgs) => (...updateHookArgs: UpdateHookArgs) => HookReturnValue {
	return (...createHookArgs): ((...updateHookArgs: UpdateHookArgs) => HookReturnValue) => {
		let updateHandler: (...updateHookArgs: UpdateHookArgs) => HookReturnValue = (
			...initialUpdateHookArgs
		): HookReturnValue => {
			let currentState: HookState = computeInitialHookState({
				createHookArgs,
				initialUpdateHookArgs,
			});

			updateHandler = (...newUpdateHookArgs): HookReturnValue => {
				currentState = computeNewHookState({
					newUpdateHookArgs,
					oldHookState: currentState,
				});

				return computeHookReturnValue(currentState);
			};

			return computeHookReturnValue(currentState);
		};

		return (...updateHookArgs): HookReturnValue => updateHandler(...updateHookArgs);
	};
}
