import axios from 'axios';
import { URI_BASE } from '../configs/api';

axios.defaults.baseURL = URI_BASE;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8000/api';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
