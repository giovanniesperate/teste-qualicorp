/* eslint-disable no-empty-pattern */
import axios from "../../axios.js";

const getDefaultState = () => {
  return {
    clienteList: [],
  };
};

const state = getDefaultState();

const getters = {
  clienteList: (state) => state.clienteList,
};

const mutations = {
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setClienteList(state, list) {
    state.clienteList = list;
  },
};

const actions = {
  resetState({ commit }) {
    commit("resetState");
  },
  async getClienteList({ commit }) {
    const { data } = await axios.get("/cliente");
    commit("setClienteList", data);
    return data;
  },
  async getClienteById({}, { guid }) {
    const { data } = await axios.get(`/cliente/${guid}`);
    return data;
  },
  async insertCliente({}, { nome, email, cpf, telefoneList }) {
    const { data } = await axios.post("/cliente", {
      nome,
      email,
      cpf,
      telefoneList,
    });
    return data;
  },
  async updateCliente({}, { guid, nome, email, cpf, telefoneList }) {
    return await axios.put(`/cliente/${guid}`, {
      nome,
      email,
      cpf,
      telefoneList,
    });
  },
  async deleteCliente({}, { guid }) {
    const { data } = await axios.delete(`/cliente/${guid}`);
    return data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
