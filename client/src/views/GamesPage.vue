<template>
  <div class="GamesPage">
      <div class="buttonContainer">
        <span id="refresh" class="button" @click="refreshGames()">Refresh</span>
        <span id="filter" class="button" @click="filterGames()">Filter</span>
      </div>
      <div>
        <div class="game" v-for="game in games" :key="game.id">
        <span class="button">Join</span>
        <span class="name">{{ game.name }}</span>
        <span class="player_count">
          {{game.players.length}} / {{ game.max_players }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import IGame from "../types/game"
import Networking from "../networking"

export default class GamesPage extends Vue {
  networking = Networking;

  getGames() {
    this.networking.getGames().then((games: IGame[]) => {
      console.log(games)
    })
  }

  games:IGame[] = [
  {
    id: "wbqweuifb",
    players: [],
    max_players: 16,
    active: true,
    name: "Test Game",
    public: true
  },
  {
    id: "wbqweuifb",
    players: [],
    max_players: 16,
    active: true,
    name: "Test Game",
    public: true
  },
  {
    id: "wbqweuifb",
    players: [],
    max_players: 16,
    active: true,
    name: "Test Game",
    public: true
  },
  {
    id: "wbqweuifb",
    players: [],
    max_players: 16,
    active: true,
    name: "Test Game",
    public: true
  },
  {
    id: "gpiaeurbgiuebr",
    players: [],
    max_players: 16,
    active: true,
    name: "Other Game",
    public: true
  }]
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

.buttonContainer {
  display: flex;
    & > * {
    margin-right:0.5rem
  }
  padding: 0.5rem;
}
</style>
