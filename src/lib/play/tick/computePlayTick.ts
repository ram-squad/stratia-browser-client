import type {Point} from "$lib/math/point/Point.ts";
import {calculateDistanceBetweenTwoPoints} from "$lib/math/point/calculateDistanceBetweenTwoPoints.ts";
import type {Play} from "$lib/play/Play.ts";
import type {Entity} from "$lib/play/entity/Entity.ts";

export function computePlayTick(play: Play, deltaTimeSeconds: number): Play {
	return {
		...play,
		entities: play.entities.map((entity): Entity => {
			const newDirectionRadians =
				entity.targetPosition === null
					? entity.directionRadians
					: Math.atan2(
							entity.targetPosition.y - entity.position.y,
							entity.targetPosition.x - entity.position.x,
						) +
						(Math.PI * 3) / 2;

			const newSpeedPerSecond = entity.targetPosition === null ? 0 : 100;

			const newPotentialPosition: Point = {
				x: entity.position.x - Math.sin(newDirectionRadians) * newSpeedPerSecond * deltaTimeSeconds,
				y: entity.position.y + Math.cos(newDirectionRadians) * newSpeedPerSecond * deltaTimeSeconds,
			};

			const {newPosition, newTargetPosition} =
				entity.targetPosition === null
					? {
							newPosition: newPotentialPosition,
							newTargetPosition: null,
						}
					: calculateDistanceBetweenTwoPoints(newPotentialPosition, entity.targetPosition) >
						  calculateDistanceBetweenTwoPoints(entity.position, entity.targetPosition)
						? {
								newPosition: entity.targetPosition,
								newTargetPosition: null,
							}
						: {
								newPosition: newPotentialPosition,
								newTargetPosition: entity.targetPosition,
							};

			const updatedEntity: Entity = {
				...entity,
				directionRadians: newDirectionRadians,
				position: newPosition,
				speedPerSecond: newSpeedPerSecond,
				targetPosition: newTargetPosition,
			};

			console.log(updatedEntity);

			return updatedEntity;
		}),
	};
}
