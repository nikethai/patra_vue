<template>
  <v-container fluid>
    <v-data-iterator
      :items="countries"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="true"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="mb-1" color="blue" dark>
          <v-text-field
            clearable
            flat
            hide-details
            label="Search"
            solo-inverted
            v-model="search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              :items="keys"
              flat
              hide-details
              label="Sort by"
              solo-inverted
              v-model="sortBy"
            ></v-select>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            :key="item.country"
            cols="12"
            lg="3"
            md="4"
            sm="6"
            v-for="item in props.items"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold"
                >{{ item.country }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item :key="index" v-for="(key, index) in filteredKeys">
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }"
                    >{{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                    :class="{ 'blue--text': sortBy === key }"
                    class="align-end"
                    >{{ item[key] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row align="center" class="mt-2" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn class="ml-2" color="primary" dark text v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                :key="index"
                @click="updateItemsPerPage(number)"
                v-for="(number, index) in itemsPerPageArray"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text"
            >Page {{ page }} of {{ numberOfPages }}</span
          >
          <v-btn
            @click="formerPage"
            class="mr-1"
            color="blue darken-3"
            dark
            fab
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn @click="nextPage" class="ml-1" color="blue darken-3" dark fab>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "corona",
  data() {
    return {
      countries: [],
      search: "",
      itemsPerPageArray: [12, 40, 80, 120, 160, 200],
      filter: {},
      page: 1,
      itemsPerPage: 12,
      sortBy: "cases",
      keys: [
        "country",
        "cases",
        "todayCases",
        "deaths",
        "todayDeaths",
        "recovered",
        "active",
        "critical",
        "casesPerOneMillion"
      ]
    };
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.countries.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `country`);
    }
  },
  /* eslint-disable no-console */
  created() {
    axios
      .get("https://coronavirus-19-api.herokuapp.com/countries")
      .then(res => {
        this.countries = res.data;
        console.log(this.countries);
      })
      .catch(e => console.log(e));
  }
};
</script>

<style></style>
