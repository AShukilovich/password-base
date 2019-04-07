<template>
  <v-container grid-list-lg>
    <v-layout>
      <v-flex>
        <h2>{{ cardAccess.title }}</h2>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex d-flex>
        <v-card hover>
          <v-container>
            <v-layout row wrap v-for="elem in cardAccess.data" :key="elem.id" >
              <v-flex xs12>
                <h4>{{ elem.title }}</h4>
              </v-flex>
              <v-flex xs12>
                <v-layout row>
                  <v-flex grow>
                    <v-text-field v-model="elem.host" label="Host" solo readonly></v-text-field>
                  </v-flex>
                  <v-flex shrink>
                    <v-btn color="primary" fab small dark class="mx-0" @click.stop.prevent="copyField(elem.host)">
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
                        <v-btn color="primary" fab small dark class="mx-0" @click.stop.prevent="copyField(elem.login)">
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
                        <v-btn color="primary" fab small dark class="mx-0" @click.stop.prevent="copyField(elem.password)">
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      'cardAccess' : {
        type: Object,
        required: true
      }
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
