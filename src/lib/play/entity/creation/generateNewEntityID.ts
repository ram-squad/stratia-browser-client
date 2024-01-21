import * as Uuid from "uuid";

export function generateNewEntityID(): string {
	return Uuid.v4();
}
