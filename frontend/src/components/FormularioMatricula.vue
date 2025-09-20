<template>
  <div class="formulario-matricula">
    <div class="container">
      <h1>Matrícula em Cursos Online</h1>

      <form @submit.prevent="submitForm" class="form">
        <!-- Campo Nome -->
        <div class="form-group">
          <label for="nome">Nome Completo *</label>
          <input
            type="text"
            id="nome"
            v-model="formData.nome"
            @blur="validateField('nome')"
            :class="{ error: errors.nome }"
            placeholder="Digite seu nome completo"
          />
          <span v-if="errors.nome" class="error-message">{{
            errors.nome
          }}</span>
        </div>

        <!-- Campo Email -->
        <div class="form-group">
          <label for="email">Email *</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            @blur="validateField('email')"
            :class="{ error: errors.email }"
            placeholder="seu.email@exemplo.com"
          />
          <span v-if="errors.email" class="error-message">{{
            errors.email
          }}</span>
        </div>

        <!-- Campo Curso -->
        <div class="form-group">
          <label for="curso">Selecione o Curso *</label>
          <select
            id="curso"
            v-model="formData.cursoId"
            @blur="validateField('cursoId')"
            :class="{ error: errors.cursoId }"
          >
            <option value="">Selecione um curso</option>
            <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
              {{ curso.nome }} - R$ {{ curso.preco.toFixed(2) }}
            </option>
          </select>
          <span v-if="errors.cursoId" class="error-message">{{
            errors.cursoId
          }}</span>
        </div>

        <!-- Botão Submit -->
        <button
          type="submit"
          :disabled="loading"
          :class="{ loading: loading }"
          class="submit-btn"
        >
          {{ loading ? "Processando..." : "Realizar Matrícula" }}
        </button>
      </form>

      <!-- Mensagens de feedback -->
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormularioMatricula",
  data() {
    return {
      formData: {
        nome: "",
        email: "",
        cursoId: null,
      },
      errors: {
        nome: "",
        email: "",
        cursoId: "",
      },
      cursos: [],
      loading: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  async mounted() {
    await this.fetchCursos();
  },
  methods: {
    async fetchCursos() {
      try {
        const response = await fetch("http://localhost:3000/api/cursos");
        if (response.ok) {
          this.cursos = await response.json();
        }
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      }
    },

    validateField(field) {
      this.errors[field] = "";

      switch (field) {
        case "nome":
          if (!this.formData.nome.trim()) {
            this.errors.nome = "Nome é obrigatório";
          } else if (this.formData.nome.trim().length < 3) {
            this.errors.nome = "Nome deve ter pelo menos 3 caracteres";
          }
          break;

        case "email":
          if (!this.formData.email.trim()) {
            this.errors.email = "Email é obrigatório";
          } else if (!this.isValidEmail(this.formData.email)) {
            this.errors.email = "Email inválido";
          }
          break;

        case "cursoId":
          if (!this.formData.cursoId) {
            this.errors.cursoId = "Selecione um curso";
          }
          break;
      }
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    validateForm() {
      this.validateField("nome");
      this.validateField("email");
      this.validateField("cursoId");

      return !Object.values(this.errors).some((error) => error !== "");
    },

    async submitForm() {
      if (!this.validateForm()) {
        this.errorMessage = "Por favor, corrija os erros no formulário";
        return;
      }

      this.loading = true;
      this.errorMessage = "";
      this.successMessage = "";

      try {
        const response = await fetch("http://localhost:3000/api/matricula", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.formData),
        });

        const data = await response.json();

        if (response.ok) {
          this.successMessage = data.message;
          this.formData = { nome: "", email: "", cursoId: null };
        } else {
          this.errorMessage = data.error || "Erro ao realizar matrícula";
        }
      } catch (error) {
        this.errorMessage = "Erro de conexão. Tente novamente.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.formulario-matricula {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4caf50;
}

input.error,
select.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.submit-btn.loading {
  opacity: 0.7;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  border: 1px solid #c3e6cb;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  border: 1px solid #f5c6cb;
}
</style>
