import axios from 'axios';
import { URI_BASE } from '../../configs/api';

const routes = {
    getInstallments: 'installments/'
};

export default {
    actions: {
        async getInstallments({commit}, params) {
            try {
                const response = await axios.get(`${URI_BASE}${routes.getInstallments}`);
                commit('INSTALLMENTS', response.data);
            } catch(error) {
                return error.data;
            }
        },
    },
    
    mutations: {
        ['INSTALLMENTS'](state, payload) {
            state.allInstallments = payload;
        }
    },
    
}