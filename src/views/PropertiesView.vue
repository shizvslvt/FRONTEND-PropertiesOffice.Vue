<template>
      <app-properties-list :properties="properties" @load="loadProperties"></app-properties-list>
</template>

<script>
import AppPropertiesList from "@/AppPropertiesList.vue";
import {computed} from "vue";


export default {
  name: 'App',
  data() {
    return {
      properties: []
    }
  },
  methods: {
    async loadProperties() {
        const response = await fetch('http://localhost:8080/properties', {
          method: 'GET'
        })
        this.properties = await response.json()
    }
  },

  components: {AppPropertiesList},
  provide() {
    return {
      properties: computed(() => this.properties)
    }
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:8080/properties');
      this.properties = await response.json();
    } catch (error) {
      console.error("Error while loading:", error);
    }
  },
}
</script>

<style scoped>

</style>