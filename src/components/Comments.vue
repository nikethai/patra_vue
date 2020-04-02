<template>
  <v-flex
    v-if="getTaskView.comments.length > 0"
    class="d-flex flex-column"
    style="text-align: left"
  >
    <v-card v-for="cmt in getTaskView.comments" :key="cmt.id" tile>
      <v-row no-gutters>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{cmt.username}}</v-list-item-title>
        </v-list-item-content>
      </v-row>
      <v-row no-gutters>
        <v-container>
           <span v-html="cmt.comment"></span>
          <p class="text-wrap"></p>
        </v-container>
      </v-row>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name:'comments',
    data(){
        return{

        }
    },
    methods:{

    },
    computed:{
        ...mapGetters(["getTaskView"])
    }
};
</script>

<style>
</style>