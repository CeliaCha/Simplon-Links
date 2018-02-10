<template>
  <div class="SoloLink">    
    <md-card>
      <md-card-header>
        <div class="md-title">Coffee Links</div>
      </md-card-header>

      <md-card-content>
        <p>{{linkTitle}}</p>
        <p>{{linkDescription}}</p>
       <a :href="url"><img :src="preview" alt="ljlkj"></a>
      </md-card-content>

      <md-card-actions>
        <md-button>Mettre à jour</md-button>
        <md-button >Ajouter</md-button>
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
      link: db.ref("liens")
    };
  },
  data() {
    return {
      dataAvailable: false,
      preview: "",
      linkTitle: "",
      linkDescription: "",
      url: ""
    };
  },

  mounted() {
    simplonLink.once("value").then(response => {
      this.link = response.val()
      this.dataAvailable = true
      this.axios
        .get(
          `http://api.linkpreview.net/?key=5a7cbcdda34363028ff1d83e0f7b136f8245aedfc3191&q=${this.link}`
        )
        .then(response => {
          this.preview = response.data.image
          this.linkTitle = response.data.title
          this.linkDescription = response.data.description
          this.url = response.data.url
        });
    });
  },
  methods: {}
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 250px;
}
</style>
