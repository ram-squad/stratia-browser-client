import type {Entity} from "$lib/play/entity/Entity.ts";
import type {EntitySelection} from "$lib/play/entity/selection/EntitySelection.ts";

export function computeEntityWithSelectionStatusesHook(
	entities: readonly Entity[],
	entitySelection: EntitySelection | null,
) {
	return entities.map((entity) => {
		const isSelected = entitySelection !== null && entity.id === entitySelection.entity.id;

		return {
			entity,
			isSelected,
		};
	});
}
