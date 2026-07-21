<template>
  <div class="property-card-content" :class="variant === 'detail' ? 'variant-detail' : 'variant-grid'">
    <div class="property-media">
      <img
          v-if="property.imgUrl"
          :src="displayImgUrl"
          :alt="property.title"
          class="property-image"
          decoding="async"
      />
      <div v-else class="property-image property-image--placeholder">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M3 21V8L12 3L21 8V21H14V14H10V21H3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
        </svg>
      </div>

      <span class="status-pill" :class="'status-pill--' + property.status.toLowerCase()">
        {{ statusLabel }}
      </span>
    </div>

    <div class="property-body">
      <h3 class="property-title">{{ property.title }}</h3>
      <div class="property-price">${{ property.price.toLocaleString('en-US') }}</div>

      <div class="property-location">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 22C12 22 19 15.4 19 10A7 7 0 0 0 5 10C5 15.4 12 22 12 22Z" stroke="currentColor" stroke-width="1.6"/>
          <circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="1.6"/>
        </svg>
        {{ property.location }}
      </div>

      <p class="property-description">{{ property.description }}</p>

      <div class="property-stats">
        <div class="stat">
          <span class="stat-label">Area</span>
          <span class="stat-value">{{ property.area }} m²</span>
        </div>
        <div class="stat">
          <span class="stat-label">Agent rating</span>
          <span class="stat-value stat-value--rating">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            {{ property.realtorRating }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyCard',
  props: {
    property: { type: Object, required: true },
    variant: {
      type: String,
      default: 'grid', // 'grid' | 'detail'
      validator: (v) => ['grid', 'detail'].includes(v)
    }
  },
  computed: {
    statusLabel() {
      if (this.property.status === 'AVAILABLE') return 'Available'
      return this.property.status === 'RESERVED' ? 'Reserved' : 'Sold'
    },
    displayImgUrl() {
      if (!this.property.imgUrl) return ''
      return this.variant === 'grid'
          ? this.property.imgUrl.replace('/images/', '/images/thumbnails/')
          : this.property.imgUrl
    }
  }
}
</script>

<style scoped>
.property-media {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: var(--green-soft);
}

.variant-grid .property-media { aspect-ratio: 4 / 3; }
.variant-detail .property-media { aspect-ratio: 16 / 9; }

.property-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.property-image--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
}

.status-pill {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  color: #fff;
  box-shadow: var(--shadow-sm);
}

.status-pill--available { background: var(--green); }
.status-pill--reserved { background: var(--amber); }
.status-pill--sold { background: var(--red); }

.property-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.property-title {
  font-weight: 600;
  color: var(--text);
  line-height: 1.3;
}

.variant-grid .property-title { font-size: 18px; }
.variant-detail .property-title { font-size: 24px; }

.property-price {
  font-weight: 700;
  color: var(--green-dark);
  font-family: 'Fraunces', serif;
}

.variant-grid .property-price { font-size: 26px; }
.variant-detail .property-price { font-size: 28px; }

.property-location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted);
}

.variant-grid .property-location { font-size: 13.5px; }
.variant-detail .property-location { font-size: 14px; }

.property-description {
  margin: 0;
  line-height: 1.5;
}

.variant-grid .property-description {
  color: var(--text-muted);
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.variant-detail .property-description {
  color: var(--text);
  font-size: 15px;
  line-height: 1.6;
}

.property-stats {
  display: flex;
  gap: 20px;
  padding: 14px 0;
  margin-top: 4px;
  border-top: 1px solid var(--border);
}

.variant-detail .property-stats { gap: 24px; }

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-value {
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-value--rating {
  color: var(--amber);
}
</style>