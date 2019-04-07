<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-container fluid>
          <v-layout row>
            <v-flex xs12>
              <v-text-field label="Search" v-model="searchTerm"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex v-for="access in filteredAccesses" :key="access.id" xs12 sm10 offset-sm1 md4 offset-md0>
        <v-card class="pa-3">
          <v-layout align-center>
            <v-flex>
              <h2>{{ access.title }}</h2>
            </v-flex>
            <v-flex d-flex>
              <v-spacer></v-spacer>
              <v-btn :to="{name: 'cardAccess', params: {id: access.id}}">Detail page</v-btn>
              <v-dialog v-model="dialog" scrollable max-width="900">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" v-on="on">Detail in modal</v-btn>
                </template>
                <v-card hover>
                  <v-container>
                    <v-layout row wrap v-for="elem in access.data" :key="elem.id" >
                      <v-flex xs12>
                        <h4>{{ elem.title }}</h4>
                      </v-flex>
                      <v-flex xs12>
                        <v-layout row>
                          <v-flex grow>
                            <v-text-field v-model="elem.host" label="Host" solo readonly></v-text-field>
                          </v-flex>
                          <v-flex shrink>
                            <v-btn color="primary" fab small dark class="mr-0" @click.stop.prevent="copyField(elem.host)">
                              <v-icon>file_copy</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                        <v-layout row>
                          <v-flex xs12 md6>
                            <v-layout row>
                              <v-flex grow>
                                <v-text-field v-model="elem.login" label="Login" solo readonly></v-text-field>
                              </v-flex>
                              <v-flex shrink>
                                <v-btn color="primary" fab small dark @click.stop.prevent="copyField(elem.login)">
                                  <v-icon>file_copy</v-icon>
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex xs12 md6>
                            <v-layout row>
                              <v-flex grow>
                                <v-text-field v-model="elem.password" label="Password" solo readonly></v-text-field>
                              </v-flex>
                              <v-flex shrink>
                                <v-btn color="primary" fab small dark class="mr-0" @click.stop.prevent="copyField(elem.password)">
                                  <v-icon>file_copy</v-icon>
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        searchTerm: null,
      }
    },
    computed: {
      accesses() {
        return this.$store.getters.getAccesses
      },
      filteredAccesses() {
        let accesses = this.accesses;
        if(this.searchTerm) {
          accesses = accesses.filter(b => 
            b.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0
            || b.description.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0
            || b.extraField.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0)
        }
        return accesses;
      },
    },
    methods: {
      copyClipboard: function(str, mimetype) {
        if (typeof mimetype == "undefined") {
            mimetype = "text/plain";
        }
        document.oncopy = function(event) {
            event.clipboardData.setData(mimetype, str);
            event.preventDefault();
        };
        document.execCommand("Copy", false, null);
      },

      copyField(copyStr) {
        this.copyClipboard(copyStr);
      }
    }
  }
</script>

<style scoped>
  
</style>