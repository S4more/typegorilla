<template>
  <div id="endScreen" v-if="game_over">
    <div class="info">
      <span class="wpm">Words per minute: {{ Math.round(final_wpm * 100) / 100 }}</span> 
      <span class="raw_wpm">Raw words per minute: {{ wpm }}</span>
      <span class="accuracy">Accuracy: {{ Math.round(accuracy * 10000)/100 }} %</span>

      <span class="time">Time: {{ Math.floor((end_time/1000)/60) }}:{{ Math.floor(((end_time/1000) % 60)) }}</span>

      <label for="name">Name:</label>
      <input type="text" name="name" :ref="name_input" autocomplete="off">
    </div>
  </div>
  <div class="InGame">
    <input id="main_input" type="text" autocomplete="off" ref="textinput" v-model="current_input"  autofocus>
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
          <span v-if="typed_words[i].length > word.length" class="wrong"> 
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
      final_wpm: 0,
      accuracy: 0,
      end_time: 0,
      wpm: 0,
      game_over:false,
      start_time: 0,
      current_index: 0,
      current_input: "",
      typed_words:[] as string[],
      words_left: [] as string[],
      total_char_length: 0,
      all_words: words.genWords(words.words, 20),
    }
  },

  watch: {
    current_input: function(val) {
      if(!this.start_time) {
        this.start_time = Date.now();
      }
    
      if(val[val.length -1 ] == " ") {
        this.typed_words.push(val.replace(" ", ""));
        this.words_left.shift();
        this.current_index = this.typed_words.length;
        this.current_input = "";
        let time_elapsed = (Date.now() - this.start_time) / 1000;
        this.wpm = Math.round((this.typed_words.length / (time_elapsed / 60)) * 1000) / 1000;

        if(this.words_left.length == 0) {
          this.gameOver();
        }
      }
    }
  },

  methods: {
    gameOver(){
      this.game_over = true;
      this.end_time = Date.now() - this.start_time;

      this.accuracy = this.calculateAccuracy();
      this.final_wpm = this.calculateFinalWPM(this.accuracy, this.wpm);

      (this.$refs.textinput as HTMLInputElement).removeEventListener("blur", this.reFocus);
      (this.$refs.textinput as HTMLInputElement).blur();
      setTimeout(() => {
        (this.$refs.name_input as HTMLInputElement).focus();
      }, 100)
      addEventListener("keydown", (event) => {
        if(event.key == "Tab") {
          this.restart();
        }
      })
    },

    calculateAccuracy () { 
      let correct = 0;
      let incorrect = 0;

      this.all_words.forEach((word, i) => {
        if(word == this.typed_words[i]){
          correct += word.length;
        } else { 
          for(let j = 0; j <  word.length; j++) {
            if (word[j] == this.typed_words[i][j]){
              correct++;
            } else {
              incorrect++;
            }
          }
        }
      })
      if(incorrect == 0) return 1;
      else return correct / (incorrect + incorrect);
    },

    calculateFinalWPM(accuracy:number, wpm:number) {
      return wpm * accuracy;
    },

    reFocus(){
      (this.$refs.textinput as HTMLInputElement).focus();
    },

    restart(){
      (this.$refs.textinput as HTMLInputElement).addEventListener("blur", this.reFocus);
      this.game_over = false;
      this.all_words = words.genWords(words.words, 20);
      this.typed_words = [];
      this.start_time = 0;
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
  },

  mounted(){
    this.restart();
  }
});

</script>
<style scoped lang="scss">
* {
  font-family:monospace;
  font-size: 1.4rem;
}

#endScreen {
  z-index: 200 !important;
  backdrop-filter: blur(10px);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;

  .info {
    display: flex;
    flex-direction: column;
    color: var(--color4);
  }
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

input{
  margin: 1rem;
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

</style>
