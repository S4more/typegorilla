<template>
  <div class="InGame">
    <input id="main_input" type="text" ref="textinput" v-model="current_input" onblur="this.focus()" autofocus>
    <div id="text_window">
      <span class="word typed_word" v-for="(word, i) in typed_words" :key="i">
        <span v-if="word != all_words[i]" class="wrong_word">
          {{ all_words[i] }}
        </span>
        <span v-else>
          {{ word }}
        </span>
      </span>
      <span class="word left_word" v-for="word in words_left" :key="word">
        {{ word }}
      </span>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/runtime-core";

export default defineComponent({
  name: "InGame",
  
  data(){
    return {
      current_index: 0,
      current_input: "",
      typed_words: [] as string[],
      all_words: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
pariatur. Excepteur sint occaecat cupidatat non proident, sunt\
in culpa qui officia deserunt mollit anim id est laborum.`.split(" "),

      words_left: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,\
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris\
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in\
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\
pariatur. Excepteur sint occaecat cupidatat non proident, sunt\
in culpa qui officia deserunt mollit anim id est laborum.`.split(" "),

    }
  },
  watch: {
    current_input: function(val) {
      let current_word = this.all_words[this.current_index];
      console.log(val);
      if(val[val.length -1 ] == " "){
        this.typed_words.push(val.replace(" ", ''));
        this.words_left.shift();
        this.current_index = this.typed_words.length;
        this.current_input = "";
      }
    }
  },
});
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

#main_input {
  opacity: 0%;
}

.word {
  margin:0.25rem;
}

#text_window{
  display: flex;
  max-width: 80vw;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
.typed_word {
  color:var(--color4);
}
.left_word {
  color:var(--color3);
}
.wrong_word {
  color: red;
}
</style>
