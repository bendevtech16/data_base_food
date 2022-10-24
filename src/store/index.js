import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    xlsDatas: [],
    components: [
      {
        name:'Eau',
        unit:'g'
      },
      {
        name:'Energie',
        unit:'kcal'
      },
      {
        name:'Proteine',
        unit:'g'
      },
      {
        name:'Azote',
        unit:'g'
      },
      {
        name:'Lipides',
        unit:'g'
      },
      {
        name:'Cendre',
        unit:'g'
      },
      {
        name:'Glucides',
        unit:'g'
      },
      {
        name:'Glucode',
        unit:'g'
      },
      {
        name:'Lactose',
        unit:'g'
      },
      {
        name:'Fructose',
        unit:'g'
      },
      {
        name:'Maltose',
        unit:'g'
      },
      {
        name:'Fibres Alimentaire',
        unit:'g'
      },
      {
        name:'Fibres solubles',
        unit:'g'
      },
      {
        name:'Fibres insolubles',
        unit:'g'
      }
    ],
    user:{
      email:'admin@fooddb.com',
      password: "123456789",
      logged_in: false
    }
  },
  getters: {
    getDatas(state) {
      return state.xlsDatas
    },
    search:(state) => (expr) => {
      let words = expr.split(' ')
      let founds = []
      state.xlsDatas.forEach((meal) => {
        words.forEach((word) => {
          if(word.length > 2){
            if (meal['Repas consommé'].search(new RegExp(word, 'i')) !== -1 ) {
              founds.push(meal)
            }
          }
        })
      })
      return founds
    },
    searchByComp:(state) => (expr, portion) => {
      let word = expr.split(' ')[0]
      let founds = []
      state.xlsDatas.forEach((meal) => {
        meal.components.forEach((component) => {
          if(component.name .search(new RegExp(word, 'i')) !== -1){
            if (parseInt(portion) >= component.value) {
            founds.push(meal)
            }
          }
        })
      })
      return founds
    },
    getByID: (state) => (id) => {
      return state.xlsDatas.find(items => items['id'] == id) || {}
    }
  },
  mutations: {
    setDatas (state, datas) {
      let id = 1
      datas.forEach((meal) => {
        meal['id'] = id
        id+=1
        /*on génère les valeurs des composants*/
        let components = []
        let max = 100
        let stateComponents = []
        stateComponents = [...state.components]
        stateComponents.forEach((component) => {
          let myComponent = {}
          myComponent.name = component.name
          myComponent.unit = component.unit
          if(myComponent.unit == 'kcal'){
            myComponent['value'] = Math.floor(Math.random() * 1000)
          }else{
            let value = Math.floor(Math.random() * max)
            myComponent['value'] = value
            max -= value
          }
          components.push(myComponent)
        })
        meal['components'] = components
      })
      state.xlsDatas = datas
      window.location.href="/#home"
    },
    login (state) {
      state.user.logged_in = true
    },
    logout (state) {
      state.user.logged_in = false
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]

})
