<script setup>
import logo from '../assets/logo.png'
import { useRouter, useRoute } from 'vue-router'

import '../assets/reading.css'
import '../assets/full-test.css'

const router = useRouter()
const route = useRoute()

const packageId =
  route.params.packageId || 'paket-soal-1'

const startFullTest = () => {
  router.push(
    `/listening/${packageId}?fullTest=true`
  )
}
</script>

<template>

  <header class="cbt-header">

    <div class="header-left">

      <div class="logo-box">
        <img
          :src="logo"
          alt="Logo"
          class="logo-image"
        />
      </div>

      <div>

        <h1 class="header-title">
          TEP Exercise
        </h1>

        <p class="header-subtitle">
          TOEFL ITP Full Test
        </p>

      </div>

    </div>

  </header>

  <div class="full-test-page">

    <div class="hero-card">

      <div class="hero-icon">
        🎓
      </div>

      <h1 class="hero-title">
        TOEFL ITP Full Test
      </h1>

      <p class="hero-subtitle">
        ETS TOEFL ITP Practice Tests
        Level 1 Volume 3
      </p>

      <div class="package-badge">
        {{ packageId }}
      </div>

      <div class="section-grid">

        <div class="section-card">

          <div class="section-icon">
            🎧
          </div>

          <h3>
            Listening
          </h3>

          <p>
            50 Questions
          </p>

          <span>
            35 Minutes
          </span>

        </div>

        <div class="section-card">

          <div class="section-icon">
            📝
          </div>

          <h3>
            Structure
          </h3>

          <p>
            40 Questions
          </p>

          <span>
            25 Minutes
          </span>

        </div>

        <div class="section-card">

          <div class="section-icon">
            📖
          </div>

          <h3>
            Reading
          </h3>

          <p>
            50 Questions
          </p>

          <span>
            55 Minutes
          </span>

        </div>

      </div>

      <div class="summary-box">

        <div class="summary-item">
          <strong>140</strong>
          <span>Total Questions</span>
        </div>

        <div class="summary-item">
          <strong>115</strong>
          <span>Total Minutes</span>
        </div>

      </div>

      <button
        class="start-btn"
        @click="startFullTest"
      >
        Start Full Test
      </button>

    </div>

  </div>

</template>