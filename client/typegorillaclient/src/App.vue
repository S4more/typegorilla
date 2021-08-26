<template>
<div id="header">
  <h1>gorillatype</h1>
  <div id="nav">
    <router-link to="/about">About</router-link>
    <router-link to="/games">Find a match</router-link>
    <router-link to="/">Home</router-link> 
  </div>
</div>
<router-view/>
</template>
<style lang="scss">



@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

:root {
  --color1: #262727;
  --color2: #665957;
  --color3: #C8B1A9;
  --color4: #FFFFFF;
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#header {
  display: flex;
  align-items: flex-end;
}

h1 {
  font-size: 2.4rem;
  text-align: left;
  padding-left: 1rem;
  color: var(--color4);
}

body {
  margin: 0px;
  padding: 2rem;
  background-color: var(--color1);
}

#nav {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  a {
    padding: 0.5rem;
    color: var(--color2);
    border-radius: 0.25rem;
    transition: background-color 0.2s, color 0.2s;
    text-decoration: none;
    font-weight: bold;
  }
  a:hover {
    background-color: var(--color2);
    color: var(--color4);
    box-shadow: 2px 2px 2px rgba(black, 0.25);
  }
}

</style>
