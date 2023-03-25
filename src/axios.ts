import Axios from "axios";

let axios = Axios.create({ withCredentials: true });
axios.defaults.withCredentials = true;

export default axios;
