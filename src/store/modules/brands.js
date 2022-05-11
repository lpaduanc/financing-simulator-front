import axios from 'axios';
import { URI_BASE } from '../../configs/api';

const routes = {
    getBrands: 'vehicles/brand'
};

export default {
    actions: {
        async getBrands({commit}) {
            try {
                const response = await axios.get(`${URI_BASE}${routes.getBrands}`);
                commit('BRANDS', response.data);
                return;
            } catch(error) {
                return error.data;
            }
        }
    },
    
    mutations: {
        ['BRANDS'](state, payload) {
            state.allBrands = payload;
        }
    },
    
}