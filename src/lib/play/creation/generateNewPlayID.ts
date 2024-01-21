import * as Uuid from "uuid";

export function generateNewPlayID(): string {
	return Uuid.v4();
}
