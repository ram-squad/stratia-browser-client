import * as Uuid from "uuid";

export function generateNewPlayId() {
	return Uuid.v4();
}
