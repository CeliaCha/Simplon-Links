<template>
  <div class="SoloLink">
    <md-toolbar class="md-primary">
      <span class="md-title">Simplon Links</span>
    </md-toolbar>
    <md-card>
      <md-card-header>
        <div class="md-title">{{currentLink.title}}</div>
      </md-card-header>
  
      <md-card-content>
        <span v-if="requestSuccess">
                      <p>{{currentLink.description}}</p>
                      <a :href="currentLink.url"><img :src="currentLink.image" alt="Dernier lien posté"></a>
                  </span>
        <span v-else>
                      <vue-simple-spinner size="big"></vue-simple-spinner>
                      <p>Connexion à la base de données...</p>
                  </span>
      </md-card-content>
    </md-card>
  
    <md-bottom-bar md-type="shift">
      <md-bottom-bar-item id="bottom-bar-item-home" md-label="Ajouter un lien" md-icon="add_circle" @click="showDialog = true"></md-bottom-bar-item>
      <md-bottom-bar-item v-on:click="previousLink" id="bottom-bar-item-pages" md-label="Lien précédent" md-icon="skip_previous"></md-bottom-bar-item>
      <md-bottom-bar-item v-on:click="nextLink" id="bottom-bar-item-posts" md-label="Lien suivant" md-icon="skip_next"></md-bottom-bar-item>
      <md-bottom-bar-item id="bottom-bar-item-favorites" md-label="Afficher la liste" md-icon="view_list"></md-bottom-bar-item>
    </md-bottom-bar>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Ajouter un lien</md-dialog-title>
      <md-field>
        <label>Entrez un lien valide</label>
        <md-input v-model="addedLink"></md-input>
      </md-field>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Annuler</md-button>
        <md-button class="md-primary" @click="addLink">Sauvegarder</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import Spinner from "vue-simple-spinner";
  import {
    config,
    firebaseApp,
    db,
    linksRef,
    log
  } from "../assets/utils.js";
  
  export default {
    name: "SoloLink",
    components: {
      "vue-simple-spinner": Spinner
    },
    data() {
      return {
        showDialog: false,
        requestSuccess: false,
        currentLink: {},
        currentKey: 0,
        addedLink: "",
        linkList: []
      };
    },
    mounted() {
      log(this.linkList);
      linksRef.once("value").then(snapshot => {
        for (let key in snapshot.val()) {
          this.linkList.push([snapshot.val()[key]]);
        }
        this.currentKey = this.linkList.length - 1
        this.previewLink(this.currentKey);
      });
    },
    methods: {
      previewLink(index) {
        this.axios
          .get(
            `http://api.linkpreview.net/?key=5a7cbcdda34363028ff1d83e0f7b136f8245aedfc3191&q=${
                this.linkList[index]
                }`
          )
          .then(response => {
            this.currentLink = response.data;
            this.requestSuccess = true;
          });
      },
      addLink() {
        this.requestSuccess = false;
        this.currentKey++;
        this.linkList.push(this.addedLink);
        this.showDialog = false;
        linksRef.push(this.addedLink);
        this.previewLink(this.currentKey);
      },
      previousLink() {
        this.requestSuccess = false;
        this.previewLink(this.currentKey - 1);
        this.currentKey--;
      },
      nextLink() {
        this.requestSuccess = false;
        this.previewLink(this.currentKey + 1);
        this.currentKey++;
      }
    }
  };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .md-card {
    min-height: 400px;
  }
  
  img {
    width: 350px;
    max-height: 250px !important;
  }
</style>
