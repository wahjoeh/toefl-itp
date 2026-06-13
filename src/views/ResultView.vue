<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

import '../assets/result.css'

const route = useRoute()
const router = useRouter()

const section =
  route.query.section || 'reading'

const correct =
  Number(route.query.correct || 0)

const total =
  Number(route.query.total || 0)

const converted =
  Number(route.query.converted || 0)

const percentage =
  total > 0
    ? Math.round(
        (correct / total) * 100
      )
    : 0

const goHome = () => {
  router.push('/')
}
</script>

<template>

  <div class="result-page">

    <div class="result-card">

      <div class="result-icon">
        🎉
      </div>

      <h1 class="result-title">

        {{
          section === 'reading'
            ? 'Reading Result'
            : section === 'listening'
            ? 'Listening Result'
            : 'Test Result'
        }}

      </h1>

      <div
        class="score-circle"
        :class="{
          excellent: converted >= 60,
          good: converted >= 50 && converted < 60,
          low: converted < 50
        }"
      >

        <span>
          {{ converted }}
        </span>

      </div>

      <p class="score-label">
        Converted Score
      </p>

      <div class="stats">

        <div class="stat-row">

          <span>
            Correct Answers
          </span>

          <strong>
            {{ correct }}/{{ total }}
          </strong>

        </div>

        <div class="stat-row">

          <span>
            Percentage
          </span>

          <strong>
            {{ percentage }}%
          </strong>

        </div>

      </div>

      <button
        class="home-btn"
        @click="goHome"
      >
        Back To Home
      </button>

    </div>

  </div>

</template>