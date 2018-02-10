<template>
  <div class="SoloLink">    
    <md-card>
      <md-card-header>
        <div class="md-title">Coffee Links</div>
      </md-card-header>

      <md-card-content>
        <p>{{link.title}}</p>
        <p>{{link.description}}</p>
       <a :href="link.url"><img :src="link.image" alt="ljlkj"></a>
      </md-card-content>

      <md-card-actions>
        <md-button>Lien aléatoire</md-button>
        <md-button v-on:click="addLink">Ajouter lien</md-button>
        <input
        v-model="newLink"
        placeholder="Nouveau Lien">
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
var config = {
  apiKey: "AIzaSyBHiSogpGGIDb696kdAzNyIMO7sHDCPTfg",
  authDomain: "simplon-links.firebaseapp.com",
  databaseURL: "https://simplon-links.firebaseio.com",
  projectId: "simplon-links",
  storageBucket: "simplon-links.appspot.com",
  messagingSenderId: "421544035386"
};

var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database();
var simplonLink = db.ref("liens");

export default {
  name: "SoloLink",
  firebase() {
    return {
      linkRef: db.ref("liens")
    };
  },
  data() {
    return {
      dataAvailable: false,
      link: {},
      newLink: ""
    };
  },

  mounted() {
    simplonLink.once("value").then(snapshot => {
      this.axios
        .get(
          `http://api.linkpreview.net/?key=5a7cbcdda34363028ff1d83e0f7b136f8245aedfc3191&q=${snapshot.val()}`
        )
        .then(response => {
          this.link = response.data;
        });
    });
  },
  methods: {
    addLink() {
      log("ici");
      simplonLink.set(this.newLink);
      this.axios
        .get(
          `http://api.linkpreview.net/?key=5a7cbcdda34363028ff1d83e0f7b136f8245aedfc3191&q=${this.newLink}`
        )
        .then(response => {
          this.link = response.data;
        });
    }
  }
};

function log(stuff) {
  console.log(stuff);
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 250px;
}
</style>
