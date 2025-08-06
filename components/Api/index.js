import axios from "axios";

const Api =  axios.create({
    baseURL: "https://bookaholic-api-2-production.up.railway.app/"
})

export default Api;