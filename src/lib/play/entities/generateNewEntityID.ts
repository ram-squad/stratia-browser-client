import * as Uuid from "uuid";

export function generateNewEntityID() {
	return Uuid.v4();
}
