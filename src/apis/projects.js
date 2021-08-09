import axios from "axios";

export default axios.create({
    baseURL: "https://marketplace-demo-v1.herokuapp.com/api/v1/projects"
});