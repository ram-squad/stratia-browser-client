import * as Uuid from "uuid";

export function generateNewPlayID() {
	return Uuid.v4();
}
