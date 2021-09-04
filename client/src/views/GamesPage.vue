<template>
  <div class="GamesPage">
      <div class="buttonContainer">
        <span id="refresh" class="button" @click="refreshGames()">Refresh</span>
        <router-link class="button" to="/ingame">Play Game</router-link>
        <router-link id="newgame" class="button" to="/newgame">New +</router-link>
      </div>
      <div>
        <div class="game" v-for="game in games" :key="game.id">
        <span class="button" @click="joinGame(game.id)">Join</span>
        
        <span class="name">{{ game.name }}</span>
        <span class="player_count">
          {{ game.users.length }} / {{ game.settings.max_users }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import ILobby from "../types/lobby"
import Networking from "../networking"
import { PublicRoom } from "../../../common";

export default class GamesPage extends Vue {
  networking = Networking;
  refreshGames() {
    this.networking.getGames().then((games: PublicRoom[]) => {
      this.games = games;
    })
  }

    joinGame(id: string) {
      
      this.networking.joinGame(id).then((room: PublicRoom) => {
        console.log("Joined room: " + room);
      });
    }

    games:PublicRoom[] = [
  {
    id: "wbqweuifb",
    users: [],
    active: true,
    settings: {
        max_users: 16,
        name: "Test Game",
        open: true,
        word_count: 15,
        time_limit: 60,
      }
  },
  ]
}

</script>
<style scoped lang="scss">
.game {
  display: flex;
  margin: 0.25rem;
  border-radius: 0.25rem;
  color: white;
  border: 2px solid var(--color2);
  align-items: center;
  box-shadow: 2px 2px 2px rgba(black, 0.5);

  & > * {
    margin-right:0.5rem
  }

  .player_count {
    margin-left:auto;
  }
}

#newgame {
  margin-left:auto;
}

.buttonContainer {
  display: flex;
    & > * {
    margin-right:0.5rem
  }
  padding: 0.5rem;
}
</style>
