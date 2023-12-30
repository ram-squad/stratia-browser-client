import type {Play} from "$lib/play/Play.ts";

export function computePlayTick(play: Play, deltaTimeSeconds: number): Play {
	return {
		...play,
		entities: play.entities.map((entity) => ({
			...entity,
			position: {
				x:
					entity.position.x -
					Math.sin(entity.directionRadians) * entity.speedPerSecond * deltaTimeSeconds,
				y:
					entity.position.y +
					Math.cos(entity.directionRadians) * entity.speedPerSecond * deltaTimeSeconds,
			},
		})),
	};
}
