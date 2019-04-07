<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex 
       v-for="(project, projectId) in newProjects" 
        :key="projectId"
        xs12 sm10 offset-sm1>
        <v-card class="pa-2">
          <v-card-title>
            <v-text-field v-model="project.titleProject" label="Title project"></v-text-field>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex 
                v-for="(elem, elementId) in project.list" 
                :key="elementId" 
                xs12
                class="py-0"
                >
                <v-layout align-center>
                  <v-flex>
                    <v-text-field v-model="elem.title" label="Title access"></v-text-field>
                  </v-flex>
                  <v-flex class="d-flex">
                    <v-text-field v-model="elem.host" label="Host" class="mr-3"></v-text-field>
                    <v-text-field v-model="elem.login" label="Login" class="mr-3"></v-text-field>
                    <v-text-field v-model="elem.password" label="Password"></v-text-field>
                  </v-flex>
                    <v-btn fab small color="error" @click="removeField(projectId, elementId)"><v-icon>close</v-icon></v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn color="info" class="ma-0" @click="addField(projectId)">Add field</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <v-layout justify-end>
          <v-btn color="info" @click="addNewProject">Add new projects</v-btn>
          <v-btn color="success" @click="saveNewProjects">Save accesses</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        newProjects: [
          {
            titleProject: null,
            list: [
              {
                title: null,
                host: null,
                login: null,
                password: null
              }
            ]
          }
        ]
      }
    },
    methods: {
      addField(projectId) {
        this.newProjects[projectId].list.push({
          title: null,
          host: null,
          login: null,
          password: null
        })
      },
      removeField(projectId, elementId) {
        this.newProjects[projectId].list.splice(elementId, 1);
        if( !this.newProjects[projectId].list.length )
          this.removeNewProject(projectId);
      },
      addNewProject() {
        this.newProjects.push({
          titleProject: null,
          list: [
            {
              title: null,
              host: null,
              login: null,
              password: null
            }
          ]
        })
      },
      removeNewProject(projectId) {
        this.newProjects.splice(projectId, 1);
      },
      saveNewProjects() {
        this.newProjects.forEach(project => {
          project.user = this.$store.getters.userUid;
          this.$store.dispatch('ADD_ACCESSES', project);
        });
      }
    }
  }
</script>

<style scoped>

</style>
