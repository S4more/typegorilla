<template>
  <div class="GamesPage">
    <h1>Games</h1>
    <span class="button" @click="getGames()">Load Games</span>

    <div class="game" v-for="game in games" :key="game.id">
      {{ game.name }}
      {{ game.max_players }}
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import IGame from "../types/game"
import networking from "../networking"
import { PublicRoom } from "../../../common";

export default class GamesPage extends Vue {
    networking = networking;

  getGames() {
      console.log("lul!");
      this.networking.getGames().then((games: PublicRoom[]) => {
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
  padding: 0.5rem;
  margin: 0.25rem;
  border-radius: 0.25rem;
  color: white;
  background-color: var(--color2);
}
</style>
