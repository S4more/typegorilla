<template>
  <div class="GamesPage">
    <h1>Games</h1>
    <div class="game" v-for="game in games" :key="game.id">
      <span class="id">
        {{ game.name}}
        {{ game.max_players}}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import IGame from "../types/game"

export default class GamesPage extends Vue {
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
