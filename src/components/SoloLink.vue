<template>
  <div class="SoloLink">    
    <md-card>
      <md-card-header>
        <div class="md-title">Coffee Links</div>
      </md-card-header>

      <md-card-content>
        <span v-if="requestSuccess" >
        <p>{{currentLink.title}}</p>
        <p>{{currentLink.description}}</p>
        <a :href="currentLink.url"><img :src="currentLink.image" alt="Dernier lien posté"></a>
        </span>
        <span v-else>
            <vue-simple-spinner size="huge"></vue-simple-spinner>
            <p>Connexion à la base de données...</p>
        </span>
       
      </md-card-content>

      <md-card-actions>
        <md-button>Lien aléatoire</md-button>
        <md-button v-on:click="addLink">Ajouter lien</md-button>
        <input
        v-model="addedLink"
        placeholder="Nouveau Lien">
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import Spinner from "vue-simple-spinner";
import { config, firebaseApp, db, linksRef, log } from '../assets/utils.js'

export default {
  name: "SoloLink",
  components: {
    "vue-simple-spinner": Spinner
  },
  data() {
    return {
      requestSuccess: false,
      currentLink: {},
      addedLink: "",
      linkList: []
    };
  },

  mounted() {
      log(this.linkList)
    linksRef.once("value").then(snapshot => {
      for (let key in snapshot.val()) {
        this.linkList.push(snapshot.val()[key]);
      }
      this.axios
        .get(
          `http://api.linkpreview.net/?key=5a7cbcdda34363028ff1d83e0f7b136f8245aedfc3191&q=${
            this.linkList[this.linkList.length - 1]
          }`
        )
        .then(response => {
          this.currentLink = response.data;
          this.requestSuccess = true;
        });
    });
  },
  methods: {
    addLink() {
      this.requestSuccess = false;
      this.linkList.push(this.addedLink);
      this.axios
        .get(
          `http://api.linkpreview.net/?key=5a7cbcdda34363028ff1d83e0f7b136f8245aedfc3191&q=${
            this.linkList[this.linkList.length - 1]
          }`
        )
        .then(response => {
          this.currentLink = response.data;
          this.requestSuccess = true;
        });
    }
  }
};

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 350px;
}
md-button {
  display: block;
}
</style>
