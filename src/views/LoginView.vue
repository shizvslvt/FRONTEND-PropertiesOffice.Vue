<template>
  <div class="auth-page">
    <form class="auth-card" @submit.prevent="submit">
      <h2 class="auth-title">Sign in</h2>
      <p class="auth-subtitle">Enter your email to continue</p>

      <div class="form-control">
        <label for="email">Email</label>
        <input type="text" id="email" v-model.trim="email" placeholder="you@example.com">
      </div>

      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" placeholder="••••••••">
      </div>

      <div v-if="errorMessage" class="auth-error">{{ errorMessage }}</div>

      <button class="btn-primary" type="submit" :disabled="!isValid">Sign in</button>
    </form>
  </div>
</template>

<script>
export default {
  inject: ['login'],
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  computed: {
    isValid() {
      return this.email !== '' && this.password !== ''
    }
  },
  methods: {
    async submit() {
      if (!this.isValid) return

      this.errorMessage = ''

      try {
        const response = await fetch('http://localhost:8080/users')
        const users = await response.json()

        const matchedUser = users.find(u => u.mail === this.email)

        if (!matchedUser) {
          this.errorMessage = 'User not found with this email'
          return
        }

        this.login(matchedUser.id)
        this.$router.push('/properties')
      } catch (error) {
        console.error('Login failed:', error)
        this.errorMessage = 'Something went wrong. Please try again.'
      }
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.auth-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 40px 36px;
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-title {
  font-family: 'Fraunces', serif;
  font-size: 24px;
  color: var(--text);
  margin: 0;
}

.auth-subtitle {
  color: var(--text-muted);
  font-size: 14px;
  margin: -8px 0 4px;
}

.form-control {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-control label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.form-control input {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 11px 14px;
  font-size: 14.5px;
  font-family: 'Inter', sans-serif;
  color: var(--text);
  background: var(--bg);
  outline: none;
  transition: border-color 0.15s ease;
}

.form-control input:focus {
  border-color: var(--green);
}

.auth-error {
  background: var(--red-soft);
  color: var(--red);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  font-size: 13.5px;
}

.btn-primary {
  background: var(--green);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 14.5px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  background: var(--green-dark);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 13.5px;
  cursor: pointer;
  padding: 4px 0;
}

.btn-secondary:hover {
  color: var(--green-dark);
}
</style>