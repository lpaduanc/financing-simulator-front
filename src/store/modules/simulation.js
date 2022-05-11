import axios from 'axios';
import { URI_BASE } from '../../configs/api';

const routes = {
    runSimulation: 'simulator/simulation/',
};

export default {
    actions: {
        async makeSimulation({commit}, params) {
            return await axios.post(`${URI_BASE}${routes.runSimulation}`, params);
        }
    },
    
    mutations: {
    },
    
}