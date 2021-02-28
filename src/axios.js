import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-project-8784245491664764124.cloudfunctions.net/api", 
});

export default instance;

//http://localhost:5001/project-8784245491664764124/us-central1/api 
//^^local host for testing