<template>
  <div class="InGame">
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ILobby from "../types/lobby"
import IOngoingGame from "../types/ongoingGame"
import Networking from "../networking"

export default class InGame extends Vue {
  networking = Networking;

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
