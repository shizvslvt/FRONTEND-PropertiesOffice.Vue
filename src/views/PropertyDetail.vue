<template>
  <div class="page detail-page">

    <button class="btn-back" @click="$router.push('/properties')">← Back to list</button>

    <article v-if="property" class="detail-card">
      <PropertyCard :property="property" variant="detail" />
    </article>

    <div v-else class="empty-state">
      <h4>Property not found</h4>
    </div>
  </div>
</template>

<script>
import { addRecentView } from '@/utils/recentViews'
import PropertyCard from '../components/PropertyCard.vue'

export default {
  components: { PropertyCard },
  props: ['id'],
  data() {
    return {
      property: null
    }
  },
  async mounted() {
    await this.loadProperty()
  },
  methods: {
    async loadProperty() {
      const uid = localStorage.getItem('uid')
      if (!uid) addRecentView(Number(this.id))

      const url = uid
          ? `http://localhost:8080/properties/${this.id}?uid=${uid}`
          : `http://localhost:8080/properties/${this.id}`

      try {
        const response = await fetch(url)

        if (!response.ok) {
          this.property = null
          return
        }

        this.property = await response.json()
      } catch (error) {
        console.error('Failed to load property:', error)
        this.property = null
      }
    }
  }
}
</script>

<style scoped>
.detail-page {
  padding-top: 10px;
}

.btn-back {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 0;
}

.btn-back:hover {
  color: var(--green-dark);
}

.detail-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  max-width: 640px;
  margin: 0 auto;
}

</style>