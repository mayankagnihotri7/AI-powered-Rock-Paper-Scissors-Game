import axios from "axios";

const fetch = () => axios.get("/game_rounds");

const create = (payload) => axios.post("/game_rounds", payload);

const gameRoundsApi = { fetch, create };

export default gameRoundsApi;
