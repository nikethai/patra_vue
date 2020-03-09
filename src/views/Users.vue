/* eslint-disable */
<style scoped>
img {
  max-width: 100%;
  height: auto;
  margin-left: auto;
}
</style>

<template>
  <div>
    <p>Welcome the chosen one:</p>
    <!-- <div id="users">
      <div v-for="usr in allUsers" :key="usr.id">
        {{usr}}
      </div>
    </div>-->
    <select v-model="selected">
      <option disabled value>Choose your reward: </option>
      <option>Hentai</option>
      <option>Porn</option>
    </select>
    <!-- <div id="image">
      <div v-if="selected == 'Hentai'">
        <div class="col" v-for="n in 204" :key="n">
          <b-col>
          <img :src="require(`../assets/static/hen/${n}a.png`)" />
          </b-col>
        </div>
      </div>
      <div v-if="selected == 'Porn'">
        <video
          src=""
          id="video-cont"
          width="100%"
          controls
          autoplay
        >Your browser does not support this shit!</video>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "users",
  data() {
    return {
      selected: ""
    };
  },
  computed: mapGetters(["allUsers"])
};
</script>
