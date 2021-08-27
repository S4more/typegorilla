import { PublicUser } from "./user";

export interface Room {
	uuid: string,
	users: PublicUser[],
	max_users: number,
	active: boolean,
	name: string,
	open: boolean
}
