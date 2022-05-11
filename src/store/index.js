import Vue from 'vue'
import Vuex from 'vuex'

import Vehicles from './modules/vehicles';
import Brands from './modules/brands';
import Installments from './modules/installments';
import Simulation from './modules/simulation';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    vehicles: Vehicles,
    brands: Brands,
    installments: Installments,
    simulation: Simulation,
  },
});
