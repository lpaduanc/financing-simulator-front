import axios from 'axios';
import { URI_BASE } from '../../configs/api';

const routes = {
    getVehicles: 'vehicles/',
    getByBrand: 'vehicles/brand/',
};

export default {
    actions: {
        async getVehicles({commit}) {           
            try {
                const response = await axios.get(`${URI_BASE}${routes.getVehicles}`);
                commit('VEHICLES', response.data);
            } catch(error) {
                return error.data;
            }
        },

        async getVehiclesByBrand({commit}, params) {
            try {
                const response = await axios.get(`${URI_BASE}${routes.getByBrand}${parseInt(params)}`);
                commit('VEHICLES', response.data);
            } catch(error) {
                return error.data;
            }
        },
    },
    
    mutations: {
        ['VEHICLES'](state, payload) {
            state.allVehicles = payload;
        }
    },
    
}