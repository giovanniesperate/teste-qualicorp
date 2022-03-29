<template>
  <b-container>
    <b-row>
      <b-col>
        <h4>
          <font-awesome-icon icon="users" />
          Clientes
        </h4>
      </b-col>
      <b-col class="btn-right">
        <b-button variant="primary" @click="onNovo"> NOVO </b-button>
      </b-col>
    </b-row>
    <b-card v-if="clienteList.length" class="mt-3">
      <b-table
        striped
        :fields="fields"
        hover
        :items="clienteList"
        :per-page="perPage"
        :current-page="currentPage"
        responsive
        class="mt-3"
      >
        <template #head()="{ column }">
          {{
            column == "acoes"
              ? "AÇÕES"
              : column == "email"
              ? "E-MAIL"
              : column.toUpperCase()
          }}
        </template>
        <template #cell(telefones)="row">
          <span v-for="(item, key) in row.item.telefoneList" :key="key">
            {{ item.num }}
          </span>
        </template>
        <template #cell(acoes)="row">
          <b-button
            v-b-tooltip.hover
            title="Editar"
            variant="link"
            size="sm"
            @click="onEdit(row.item.guid)"
          >
            <font-awesome-icon icon="pen" />
          </b-button>
          <b-button
            v-b-tooltip.hover
            title="Excluir"
            variant="link"
            size="sm"
            @click="onDelete(row.item.guid)"
          >
            <font-awesome-icon icon="xmark" />
          </b-button>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="clienteList.length"
        :per-page="perPage"
        aria-controls="my-table"
        align="right"
        size="sm"
        class="mt-4 mb-0"
      />
    </b-card>

    <b-modal
      v-model="showForm"
      title="Clientes"
      header-bg-variant="light"
      size="lg"
      hide-footer
      hide-header-close
    >
      <b-form @submit.prevent="onSubmit()">
        <b-row class="mb-3">
          <b-col cols="6">
            <b-form-group label="Nome:" label-for="nome">
              <b-form-input
                id="nome"
                v-model="form.nome"
                type="text"
                name="nome"
                placeholder="Digite o nome da empresa"
                required
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="CPF:" label-for="cpf">
              <b-form-input
                id="cpf"
                v-model="form.cpf"
                type="text"
                name="cpf"
                placeholder="Digite o CPF"
                v-mask="['###.###.###-##']"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col>
            <b-form-group label="E-mail:" label-for="email">
              <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                placeholder="Digite o e-mail"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row class="mb-3">
          <b-col v-for="(item, key) in form.telefoneList" :key="key">
            <b-form-group
              v-if="item.tipo == 'celular'"
              label="Celular:"
              label-for="celular"
            >
              <b-form-input
                id="celular"
                v-model="item.num"
                type="tel"
                name="celular"
                placeholder="Digite o celular"
                v-mask="['(##) #####-####']"
                required
              />
            </b-form-group>
            <b-form-group
              v-if="item.tipo == 'residencial'"
              label="Telefone residencial:"
              label-for="residencial"
            >
              <b-form-input
                id="residencial"
                v-model="item.num"
                type="tel"
                name="residencial"
                placeholder="Digite o tel. residencial"
                v-mask="['(##) ####-####']"
                required
              />
            </b-form-group>
            <b-form-group
              v-if="item.tipo == 'comercial'"
              label="Telefone comercial:"
              label-for="comercial"
            >
              <b-form-input
                id="comercial"
                v-model="item.num"
                type="tel"
                name="comercial"
                placeholder="Digite o tel. comercial"
                v-mask="['(##) ####-####']"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
        <div class="btn-right mt-3">
          <b-button variant="danger" @click="showForm = false">
            FECHAR
          </b-button>
          <b-button type="submit" variant="primary" class="mx-1">
            SALVAR
          </b-button>
        </div>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Datatable-Cliente",
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      fields: ["nome", "email", "cpf", "telefones", "acoes"],
      form: {},
      showForm: false,
    };
  },
  computed: {
    ...mapGetters("cliente", ["clienteList"]),
  },
  async mounted() {
    try {
      await this.getClienteList();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    ...mapActions("cliente", [
      "getClienteList",
      "getClienteById",
      "insertCliente",
      "updateCliente",
      "deleteCliente",
    ]),
    onNovo() {
      this.showForm = true;
      this.form = {
        telefoneList: [
          {
            tipo: "celular",
            num: "",
          },
          {
            tipo: "residencial",
            num: "",
          },
          {
            tipo: "comercial",
            num: "",
          },
        ],
      };
    },
    async onEdit(guid) {
      try {
        const { data } = await this.getClienteById({ guid });
        this.form = data;
        this.showForm = true;
      } catch (err) {
        console.log(err);
        this.$noty.error("Erro ao obter dados do cliente.");
      }
    },
    async onSubmit() {
      try {
        let r = {};

        const formData = {
          ...this.form,
          guid: this.form.guid ? this.form.guid : null,
        };

        if (formData.guid) r = await this.updateCliente(formData);
        else r = await this.insertCliente(formData);

        this.$noty.success(
          r.status == 200
            ? "Operação concluída com sucesso."
            : "Não foi possível completar a operação."
        );
      } catch (err) {
        console.log(err);
        this.$noty.error("Erro ao completar a operação.");
      } finally {
        await this.getClienteList();
        this.showForm = false;
      }
    },
    async onDelete(guid) {
      try {
        const r = await this.deleteCliente({ guid });
        this.$noty.success(
          r.status == 200
            ? "Excluído com sucesso."
            : "Não foi possível completar a exclusão."
        );
      } catch (err) {
        console.log(err);
        this.$noty.error("Erro ao excluir.");
      } finally {
        await this.getClienteList();
        this.showForm = false;
      }
    },
  },
};
</script>

<style scoped>
h4 {
  text-align: left;
}
.btn-right {
  text-align: right;
}
</style>
