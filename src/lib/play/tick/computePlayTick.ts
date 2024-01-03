import type {Play} from "$lib/play/Play.ts";
import type {Entity} from "../entity/Entity.ts";

export function computePlayTick(play: Play, deltaTimeSeconds: number): Play {
	return {
		...play,
		entities: play.entities.map((entity) => {
			const newDirectionRadians =
				entity.targetPosition === null
					? entity.directionRadians
					: Math.atan2(
							entity.targetPosition.y - entity.position.y,
							entity.targetPosition.x - entity.position.x,
						) +
						(Math.PI * 3) / 2;

			const updatedEntity: Entity = {
				...entity,
				directionRadians: newDirectionRadians,
				position: {
					x:
						entity.position.x -
						Math.sin(newDirectionRadians) * entity.speedPerSecond * deltaTimeSeconds,
					y:
						entity.position.y +
						Math.cos(newDirectionRadians) * entity.speedPerSecond * deltaTimeSeconds,
				},
			};

			return updatedEntity;
		}),
	};
}
