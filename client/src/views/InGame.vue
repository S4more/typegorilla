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
      <span class="word left_word" v-for="(word, i) in words_left" :key="i">
        <span v-if="i == 0">
          <span class="typed_word" v-if="word.indexOf(current_input) == 0">
            {{ current_input }}
          </span>
          <span v-else class="wrong_word" >
            {{ current_input }}
          </span>
          <span class="cursor">_</span>
          <span class="left_word">
            {{ word.slice(current_input.length, word.length) }}
          </span>
        </span>
        <span v-else>
          {{ word }}
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import words from "../words";

export default defineComponent({
  name: "InGame",
  data(){
    return {
      current_index: 0,
      current_input: "",
      typed_words: [] as string[],

      all_words: words.genWords(words.words, 20),

      words_left: [] as string[],
    }
  },

  watch: {
    current_input: function(val) {
      if(val[val.length -1 ] == " "){
        this.typed_words.push(val.replace(" ", ""));
        this.words_left.shift();
        this.current_index = this.typed_words.length;
        this.current_input = "";
      }
    }
  },

  mounted(){
    this.words_left = this.all_words.slice();

    (this.$refs.textinput as HTMLInputElement).addEventListener("keydown", (event) => {
      if(event.key == "Backspace") {
        if(this.current_input == ""){
          let lastWord = this.typed_words[this.typed_words.length - 1];
          if(lastWord.length) {
            this.current_input = lastWord + lastWord[lastWord.length - 1];
          } else {
            this.current_input = "";
          }
          this.words_left.unshift(this.all_words[this.typed_words.length -1]);
          this.typed_words.pop();
        }
      }
    })
  }
});

</script>
<style scoped lang="scss">
* {
  font-family:monospace;
  font-size: 1.4rem;
}
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

.cursor {
  position: absolute;  
  color: var(--color4);
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
