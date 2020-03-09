<template>
  <div class="about">
    <h1>Here we go again:</h1>
    <p v-if="user.length">
      <b>Let see what happen:</b>
      <b-container>
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="myCol"
          align="center"
        ></b-pagination>
        <!-- <b-col id="myCol" >
          <p>{{item.id}}</p>
        </b-col> -->

        <div class="row">
          <div class="col" v-for="(item,index) in currentPageItems" :key="index">
            <img :src="item.file_url"/>
          </div>
        </div>
      </b-container>
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "about",
  data() {
    return {
      perPage: 20,
      currentPage: 1,
      user: []
    };
  },
  mounted() {
    let login = "nikethai";
    let hash = "voCsDS5hVCn2tB88uPC5dAqN";
    let url =
      "https://danbooru.donmai.us/posts.json?login=" +
      login +
      "&api_key=" +
      hash +
      "&limit=400&tags=sex";
    axios
      .get(url, {
        // headers:{
        //   'Authorization':'Basic bmlrZXRoYWk6dm9Dc0RTNWhWQ24ydEI4OHVQQzVkQXFO',
        //   'Access-Control-Allow-Origin':'*'
        // },
        // auth:{
        //   username: 'nikethai',
        //   password: 'voCsDS5hVCn2tB88uPC5dAqN'
        // }
      })
      .then(response => {
        this.user = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  computed: {
    rows() {
      return this.user.length;
    },
    currentPageItems() {
      let nbPages = 0;
      let leng = this.user.length;
      let page_items = {};
      for (let i = 0; i < leng; i += this.perPage) {
        page_items[nbPages] = this.user.slice(i, i + this.perPage);
        nbPages++;
      }
      return page_items[this.currentPage - 1];
    }
  }
};
</script>
<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

/* Create four equal columns that sits next to each other */
.col {
  flex: 25%;
  max-width: 25%;
  padding: 0 4px;
}

.col img {
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
}
</style>
