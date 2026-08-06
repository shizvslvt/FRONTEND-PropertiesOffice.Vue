<template>
  <app-recommendations-list :recommendations="recommendations" @load="loadRecommendations"></app-recommendations-list>
</template>

<script>
import AppRecommendationsList from "@/AppRecommendationsList.vue";
import { getRecentViews } from '@/utils/recentViews'

export default {
  name: 'RecommendationsView',
  data() {
    return {
      recommendations: [],
      errorMessage: ''
    }
  },
  components: { AppRecommendationsList },
  methods: {
    async loadRecommendations() {
      const uid = localStorage.getItem('uid')
      this.errorMessage = ''

      try {
        let response

        if (uid) {
          response = await fetch(`http://localhost:8080/recommendations/${uid}`)
        } else {
          const recentViews = getRecentViews()

          if (recentViews.length === 0) {
            response = await fetch('http://localhost:8080/recommendations/general')
          } else {
            response = await fetch('http://localhost:8080/recommendations/guest', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ propertyIds: recentViews })
            })
          }
        }

        if (!response.ok) {
          this.errorMessage = 'Failed to load recommendations'
          return
        }

        this.recommendations = await response.json()
      } catch (error) {
        console.error('Error while loading recommendations:', error)
        this.errorMessage = 'Something went wrong'
      }
    }
  },
  async mounted() {
    await this.loadRecommendations()
  }
}
</script>

<style scoped>
</style>