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
  async getClienteById({}, { id }) {
    const { data } = await axios.get(`/cliente/${id}`);
    return data;
  },
  async insertCliente({}, { nome, email, cpf, telefone }) {
    const { data } = await axios.post("/cliente", {
      nome,
      email,
      cpf,
      telefone,
    });
    return data;
  },
  async updateCliente({}, { id, nome, email, cpf, telefone }) {
    return await axios.put(`/cliente/${id}`, {
      nome,
      email,
      cpf,
      telefone,
    });
  },
  async deleteCliente({}, { id }) {
    const { data } = await axios.delete(`/cliente/${id}`);
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
