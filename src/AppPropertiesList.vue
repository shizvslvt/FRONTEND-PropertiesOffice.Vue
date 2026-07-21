<template>
  <div class="page">
    <div v-if="properties.length !== 0" class="property-grid">
      <router-link
          v-for="property in properties"
          :key="property.id"
          :to="propertyLink(property.id)"
          class="property-card"
      >
        <PropertyCard :property="property" variant="grid" />
      </router-link>
    </div>

    <div class="empty-state" v-else>
      <h4>No properties yet</h4>
      <p>Load the list to see available properties</p>
      <button class="btn-primary" @click="$emit('load')">Load list</button>
    </div>
  </div>
</template>

<script>
import PropertyCard from './components/PropertyCard.vue'

export default {
  components: { PropertyCard },
  emits: ['load'],
  props: ['properties'],
  methods: {
    propertyLink(id) {
      const uid = localStorage.getItem('uid')
      return {
        name: 'property-detail',
        params: { id },
        query: uid ? { uid } : {}
      }
    }
  }
}
</script>

<style scoped>
.property-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px 24px;
  padding: 24px 0 32px;
}

.property-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.property-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.empty-state {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 56px 24px;
  text-align: center;
  max-width: 420px;
  margin: 40px auto;
  box-shadow: var(--shadow-sm);
}

.empty-state h4 {
  font-size: 18px;
  color: var(--text);
  margin: 0 0 8px;
}

.empty-state p {
  color: var(--text-muted);
  font-size: 13.5px;
  margin: 0 0 18px;
}

@media (max-width: 1100px) {
  .page { max-width: 90%; }
  .property-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 680px) {
  .page { max-width: 94%; }
  .property-grid { grid-template-columns: 1fr; }
}
</style>