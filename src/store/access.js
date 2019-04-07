import Vue from 'vue'
export default {
  state: {
    accesses: []
    // accesses: [
    //   {
    //     id: 'fsfwefsfadsfas',
    //     user: '6BlfZKVMUsWTd1W5KAHIZ3XLmmA2',
    //     title: 'Accesses Accesses - 1',
    //     data: [
    //       {
    //         id: 'qwe',
    //         title: 'AdminPanel',
    //         host: 'https://dasdasddwdw/dqwdqwdqwdqw',
    //         login: 'erqwerqw',
    //         password: '5rweqrq23'
    //       }
    //     ],
    //     extraField: 'qwe23eqwdw fgefewdinewd3ij r32nr32uob233n 32r n3 322rwwpf  bfuewrwe',
    //     description: 'werwqer'
    //   },
    //   {
    //     id: 'fsfwefsfaeqwdsfas',
    //     user: '6BlfZKVMUsWTd1W5KAHIZ3XLmmA2',
    //     title: 'Accesses - 2',
    //     data: [
    //       {
    //         id: 'weq',
    //         title: 'AdminPanel',
    //         host: 'https://dasdasddwdw/dqwdqwdqwdqw',
    //         login: 'erqwerqw',
    //         password: '5rweqrq23'
    //       },
    //       {
    //         id: 'eqwe',
    //         title: 'FTP',
    //         host: '132.4.484.86',
    //         login: 'rwqerq',
    //         password: 'f3qf4feq3'
    //       }
    //     ],
    //     extraField: '',
    //     description: 'fasdffwewe'
    //   },
    //   {
    //     id: 'qqweq',
    //     user: '42rwwefeqfefwefwefwefwe',
    //     title: 'Accesses - 2',
    //     data: [
    //       {
    //         id: '123',
    //         title: 'AdminPanel',
    //         host: 'https://fefewf/rw',
    //         login: 'erqwerqw',
    //         password: '5rweqrq23'
    //       },
    //       {
    //         id: 'rqw',
    //         title: 'FTP',
    //         host: '333.4.54.86',
    //         login: 'rwqerq',
    //         password: 'f3qf4feq3'
    //       }
    //     ],
    //     extraField: 'vbvref asfsdfs afds 32r n3 322rwwpf  d',
    //     description: 'qewr'
    //   }
    // ]
  },
  mutations: {
    SET_ACCESSES(state, payload) {
      state.accesses = payload
    },
  },
  getters: {
    getAccesses: (state, rootGetters) => {
      return state.accesses.filter(a => a.user === rootGetters.userUid)
    }
  },
  actions: {
    LOAD_ACCESSES({commit}, payload) {
      commit('SET_PROCESSING', true);
      Vue.$db.collection('accesses')
        .where('user', '==', payload.user)
        .get()
        .then(querySnapshot => {
          let accesses = [];
          querySnapshot.forEach(a => {
            const data = a.data();
            let access = {
              id: a.id,
              title: data.title,
              user: data.user,
              extraField: data.extraField,
              description: data.description,
              data: []
            }

            accesses.push(access);
          });
          
          commit('SET_ACCESSES', accesses);
          commit('SET_PROCESSING', false);
        })
        .catch(error => {
          commit('SET_PROCESSING', false);
          commit('SET_ERROR', error.message);
        })
    },
    ADD_ACCESSES({commit}, payload) {
      commit('SET_PROCESSING', true);
      Vue.$db.collection('accesses')
        .add(payload)
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          commit('SET_PROCESSING', false);
        })
        .catch(error => {
          commit('SET_PROCESSING', false);
          commit('SET_ERROR', error.message);
        })
    }
  }
}