<template>
  <div class="InGame">
    <input id="main_input" type="text" autocomplete="off" ref="textinput" v-model="current_input" onblur="this.focus()" autofocus>
    <div id="wpm">
      {{wpm}}
    </div>
    <div id="text_window">
      <span class="word" v-for="(word, i) in all_words" :key="i">
        <span v-if="i > typed_words.length">
          {{ word }}
        </span>
        <span v-else-if="i == typed_words.length" v-for="(letter, j) in all_words[i]" :key="j">
          <span class="cursor" v-if="j == current_input.length">_</span>
          <span class="wrong" v-if="letter != current_input[j] && current_input[j]">
            {{ all_words[i][j] }}
          </span>
          <span v-else-if="!current_input[j]">
            {{ all_words[i][j] }}
          </span>
          <span v-else class="typed">
            {{ letter }}
          </span>
          <span v-if="j == word.length - 1 && current_input.length > word.length" class="wrong">
            {{ current_input.slice(word.length) }}
          </span>
        </span>

        <span v-else class="letter" v-for="(letter, k) in word" :key="k">
          <span class="wrong" v-if="typed_words[i][k] != letter">
            {{ letter }}
          </span>
          <span v-else class="typed">
            {{ letter }}
          </span>
        </span>
        <span v-if="typed_words[i]">
          <span v-if="typed_words[i].length > word.length">
            {{ typed_words[i].slice(word.length) }}
          </span>
        </span>

        <span class="cursor" v-if="i == typed_words.length && current_input.length >= all_words[i].length">_</span>
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
      start_time: 0,
      wpm:0,
      current_index: 0,
      current_input: "",
      typed_words: [] as string[],
      words_left: [] as string[],
      total_char_length: 0,
      all_words: words.genWords(words.words, 20),
    }
  },

  watch: {
    current_input: function(val) {
      if(!this.start_time){
        this.start_time = Date.now();
      }
      
      if(val[val.length -1 ] == " "){
        this.typed_words.push(val.replace(" ", ""));
        this.words_left.shift();
        this.current_index = this.typed_words.length;
        this.current_input = "";
        let time_elapsed = (Date.now() - this.start_time) / 1000;
        this.wpm = Math.round((this.typed_words.length / (time_elapsed / 60)) * 1000) / 1000;
      }
    }
  },

  mounted(){
    this.total_char_length = 0;
    this.all_words.forEach(word => this.total_char_length += word.length);
    this.words_left = this.all_words.slice();
    (this.$refs.textinput as HTMLInputElement).addEventListener("keydown", (event) => {
      if(event.key == "Backspace") {
        if(this.current_input == "") {
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

#main_input {
  opacity: 0%;
}

#text_window {
  display: flex;
  max-width: 80vw;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  .word {
    margin:0.25rem;
    color: var(--color3);
  }
  .typed {
    color:var(--color4);
  }
  .left_word {
    color:var(--color3);
  }
  .wrong {
  color: red;
  }
  .cursor {
    position: absolute;  
    color: var(--color4);
  }
}
#wpm{
  font-size: 2rem;
  color: var(--color4);
}
</style>
