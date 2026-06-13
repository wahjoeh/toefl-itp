<script setup>
import logo from '../assets/logo.png'

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import '../assets/listening.css'
import { useRouter } from 'vue-router'

import { listeningTest as package1 }
from '../data/listening/package1'

import { listeningTest as package2 }
from '../data/listening/package2'

import {
  convertListeningScore
}
from '../utils/toeflScore'

const route = useRoute()

const listeningData = {
  'paket-soal-1': package1,
  'paket-soal-2': package2
}

const listeningTest =
  listeningData[
    route.params.packageId
  ] || package1

const shuffleArray = array => {

  const shuffled = [...array]

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {

    const j = Math.floor(
      Math.random() * (i + 1)
    )

    ;[
      shuffled[i],
      shuffled[j]
    ] = [
      shuffled[j],
      shuffled[i]
    ]

  }

  return shuffled

}

const questions =
  listeningTest.questions.map(
    question => ({
      ...question,

      shuffledOptions:
        shuffleArray(
          question.options
        )
    })
  )

const answers = ref({})

const currentQuestion = ref(0)

const timeLeft = ref(2100)
let timer = null

const audioPlayer = ref(null)

const audioStarted = ref(false)

const audioEnded = ref(false)

const currentTime = ref(0)

const duration = ref(0)

const progressPercentage = computed(() => {

  if (!duration.value) {
    return 0
  }

  return (
    currentTime.value /
    duration.value
  ) * 100

})

const formatTime = () => {

  const minutes =
    Math.floor(timeLeft.value / 60)

  const seconds =
    timeLeft.value % 60

  return `${minutes}:${seconds
    .toString()
    .padStart(2, '0')}`

}

const formatAudioTime = seconds => {

  const minutes =
    Math.floor(seconds / 60)

  const secs =
    Math.floor(seconds % 60)

  return `${minutes}:${secs
    .toString()
    .padStart(2, '0')}`

}

onMounted(() => {

  timer = setInterval(() => {

    if (timeLeft.value > 0) {

      timeLeft.value--

    } else {

      clearInterval(timer)

      submitTest()

    }

  }, 1000)

})

onUnmounted(() => {

  clearInterval(timer)

})

const playAudio = () => {

  if (
    audioStarted.value ||
    audioEnded.value
  ) {
    return
  }

  audioStarted.value = true

  audioPlayer.value.play()

}

const updateProgress = () => {

  currentTime.value =
    audioPlayer.value.currentTime

  duration.value =
    audioPlayer.value.duration

}

const audioFinished = () => {

  audioEnded.value = true

}

const nextQuestion = () => {

  if (
    currentQuestion.value <
    questions.length - 1
  ) {
    currentQuestion.value++
  }

}

const prevQuestion = () => {

  if (
    currentQuestion.value > 0
  ) {
    currentQuestion.value--
  }

}

const goToQuestion = index => {

  currentQuestion.value = index

}

const router = useRouter()

const submitTest = () => {

  let correct = 0

  questions.forEach(question => {

    if (
      answers.value[question.id] ===
      question.answer
    ) {
      correct++
    }

  })

  const convertedScore =
    convertListeningScore(correct)

  if (route.query.fullTest) {

    sessionStorage.setItem(
      'fullListeningCorrect',
      correct
    )

  }

  clearInterval(timer)

  if (route.query.fullTest) {

    router.push(
      `/structure/${route.params.packageId}?fullTest=true`
    )

  } else {

    router.push({
      path: '/result',
      query: {
        section: 'listening',
        correct,
        total: questions.length,
        converted: convertedScore
      }
    })

  }

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
          Listening Section
        </h1>

        <p class="header-subtitle">
          TEP Exercise Online
        </p>

      </div>

    </div>

    <div class="header-right">

      <div class="timer-box">
        {{ formatTime() }}
      </div>

      <div class="profile-circle">
        W
      </div>

    </div>

  </header>

  <div class="exam-container">

    <aside class="sidebar">

      <h2 class="sidebar-title">
        Navigasi Soal
      </h2>

      <div class="question-grid">

        <button
          v-for="(question,index) in questions"
          :key="question.id"
          @click="goToQuestion(index)"
          :class="[
            'question-btn',
            currentQuestion === index
              ? 'active-question'
              : answers[question.id]
              ? 'answered-question'
              : ''
          ]"
        >
          {{ question.id }}
        </button>

      </div>

      <div class="question-legend">

        <div class="legend-item">
          <span class="legend-box active"></span>
          <span>Soal Aktif</span>
        </div>

        <div class="legend-item">
          <span class="legend-box answered"></span>
          <span>Terisi</span>
        </div>

        <div class="legend-item">
          <span class="legend-box unanswered"></span>
          <span>Belum Terisi</span>
        </div>

      </div>

      <button
        class="submit-btn"
         @click="submitTest">
        Submit Test
      </button>

    </aside>

    <main class="content">

      <div class="question-card">

        <div class="question-info">

          Question
          {{ questions[currentQuestion].id }}
          of
          {{ questions.length }}

        </div>

        <div class="audio-section">

          <h2 class="audio-title">
            Listening Audio
          </h2>

          <audio
            ref="audioPlayer"
            :src="listeningTest.audio"
            preload="metadata"
            controlsList="nodownload"
            @contextmenu.prevent
            @timeupdate="updateProgress"
            @loadedmetadata="updateProgress"
            @ended="audioFinished"
            style="display:none"
          />

          <button
            class="play-btn"
            @click="playAudio"
            :disabled="audioStarted"
          >

            {{
              audioStarted
                ? 'Audio Sedang Diputar'
                : '▶ Putar Audio'
            }}

          </button>

          <div class="progress-wrapper">

            <div class="progress-bar">

              <div
                class="progress-fill"
                :style="{
                  width:
                    progressPercentage + '%'
                }"
              ></div>

            </div>

            <div class="audio-time">

              {{ formatAudioTime(currentTime) }}

              /

              {{ formatAudioTime(duration) }}

            </div>

          </div>

          <div class="audio-note">

            Audio hanya dapat
            diputar satu kali
            dan tidak dapat
            diulang.

          </div>

          <p class="test-source">
            Source: {{ listeningTest.source }}
          </p>

        </div>

        <h2 class="question-title">

          {{
            questions[
              currentQuestion
            ].question
          }}

        </h2>

        <div
          v-for="(option,index) in questions[currentQuestion].shuffledOptions"
          :key="option"
          class="option"
          :class="{
            selected:
              answers[
                questions[
                  currentQuestion
                ].id
              ] === option
          }"
          @click="
            answers[
              questions[
                currentQuestion
              ].id
            ] = option
          "
        >

          <div class="option-letter">

            {{ ['A','B','C','D'][index] }}

          </div>

          <div class="option-text">

            {{ option }}

          </div>

        </div>

        <div class="navigation">

          <button
            class="nav-btn secondary"
            @click="prevQuestion"
          >
            Previous
          </button>

          <button
            class="nav-btn primary"
            @click="nextQuestion"
          >
            Next
          </button>

        </div>

      </div>

    </main>

  </div>

</template>
```
