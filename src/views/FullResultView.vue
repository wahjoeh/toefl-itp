<script setup>
import '../assets/full-result.css'

import {
  convertListeningScore,
  convertStructureScore,
  convertReadingScore,
  calculateToeflScore
}
from '../utils/toeflScore'

const listeningCorrect =
  Number(
    sessionStorage.getItem(
      'fullListeningCorrect'
    )
  )

const structureCorrect =
  Number(
    sessionStorage.getItem(
      'fullStructureCorrect'
    )
  )

const readingCorrect =
  Number(
    sessionStorage.getItem(
      'fullReadingCorrect'
    )
  )

const listeningScaled =
  convertListeningScore(
    listeningCorrect
  )

const structureScaled =
  convertStructureScore(
    structureCorrect
  )

const readingScaled =
  convertReadingScore(
    readingCorrect
  )

const finalScore =
  calculateToeflScore(
    listeningCorrect,
    structureCorrect,
    readingCorrect
  )
</script>

<template>

  <div class="result-page">

    <div class="result-card">

      <div class="result-header">

        <div class="trophy">
          🏆
        </div>

        <h1>
          TOEFL ITP Full Test Result
        </h1>

        <p>
          ETS TOEFL ITP Practice Tests
          Level 1 Volume 3
        </p>

      </div>

      <div class="score-grid">

        <div class="score-item">

          <h3>
            🎧 Listening
          </h3>

          <div class="scaled-score">
            {{ listeningScaled }}
          </div>

          <div class="correct-score">
            {{ listeningCorrect }}/50 Correct
          </div>

        </div>

        <div class="score-item">

          <h3>
            📝 Structure
          </h3>

          <div class="scaled-score">
            {{ structureScaled }}
          </div>

          <div class="correct-score">
            {{ structureCorrect }}/40 Correct
          </div>

        </div>

        <div class="score-item">

          <h3>
            📖 Reading
          </h3>

          <div class="scaled-score">
            {{ readingScaled }}
          </div>

          <div class="correct-score">
            {{ readingCorrect }}/50 Correct
          </div>

        </div>

      </div>

      <div class="final-score-box">

        <div class="final-label">
          Final TOEFL ITP Score
        </div>

        <div class="final-score">
          {{ finalScore }}
        </div>

      </div>

      <RouterLink
        to="/"
        class="home-btn"
      >
        Back To Home
      </RouterLink>

    </div>

  </div>

</template>