<script setup>
import { useRoute } from 'vue-router'
import '../assets/result.css'

const route = useRoute()

const score = Number(route.query.score || 0)
const total = Number(route.query.total || 0)

const percentage =
  total > 0
    ? Math.round((score / total) * 100)
    : 0
</script>

<template>
  <div class="result-container">

    <div class="result-card">

      <h1>TOEFL Practice Result</h1>

      <p class="subtitle">
        Test Completed Successfully
      </p>

      <div class="score-circle">
        {{ percentage }}%
      </div>

      <h2>
        Score: {{ score }} / {{ total }}
      </h2>

      <router-link to="/">
        <button class="home-btn">
          Back To Home
        </button>
      </router-link>

    </div>

  </div>
</template>