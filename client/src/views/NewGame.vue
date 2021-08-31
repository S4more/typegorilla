<template>
  <div class="NewGame">
		<div id="options_container">
			<label for="name">Name</label>
			<input id="name" type="text">
			<label for="word_count">Word Count</label> 
			<select id="word_count" name="Word Count">
				<option value="15">15</option>
				<option value="30">30</option>
				<option value="50">50</option>
				<option value="100">100</option>
				<option value="250">250</option>
				<option value="500">500</option>
			</select>

			<label for="time_limit">Time Limit</label>
			<select id="time_limit" name="Time Limit">
				<option value="15">15s</option>
				<option value="30">15s</option>
				<option value="60">1m</option>
				<option value="120">2m</option>
				<option value="180">3m</option>
			</select>

			<label for="max_players">Max Players</label>
			<select id="max_players" name="Max Players">
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8">8</option>
				<option value="9">9</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
				<option value="13">13</option>
				<option value="14">14</option>
				<option value="15">15</option>
				<option value="16">16</option>
			</select>
			<label for="visibility">Visibility</label>
			<select id="visibility" name="Visibility">
				<option value="false">Private</option>
				<option value="true">Public</option>
			</select>		
		</div>
        <span class="button" @click="createRoom()">Create</span>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Networking from "../networking"
import { RoomSettings } from "../../../common";

export default class NewGame extends Vue {
  networking = Networking;
    settings: RoomSettings = {
		name:"", 
		word_count: 50,
		time_limit: 120,
		max_users: 16, 
		open: false,
	}

    createRoom() {
        this.networking.createRoom(this.settings).then((room_id: string) => {
            console.log("Created room. Id: " + room_id);
        });
    }
}

</script>
<style scoped lang="scss">
#options_container {
	display: flex;
	flex-direction: column;
	text-align: start;
	margin: auto;
	margin-top: 2rem;
	width: fit-content;

	label {
		margin:0.25rem;
		color: var(--color3)
	}

	input, 
	select {
		outline:none;
		border-radius: 0.25rem;
		padding: 0.25rem;
		border: 2px solid var(--color2);
		background-color: var(--color1);
		color: var(--color4);

		box-shadow: 2px 2px 2px rgba(black, 0.5);

		&:focus {
			border: 2px solid var(--color3);
		}
	}

}
</style>
