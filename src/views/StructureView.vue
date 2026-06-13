<script setup>
import logo from '../assets/logo.png'

import {
  ref,
  onMounted,
  onUnmounted
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import '../assets/structure.css'

import {
  structureTest as package1
}
from '../data/structure/package1'

import {
  structureTest as package2
}
from '../data/structure/package2'

import {
  convertStructureScore
}
from '../utils/toeflScore'

const route = useRoute()
const router = useRouter()

const structureData = {
  'paket-soal-1': package1,
  'paket-soal-2': package2
}

const structureTest =
  structureData[
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
  structureTest.questions.map(
    question => ({

      ...question,

      shuffledOptions:

        question.type ===
        'structure'

          ? shuffleArray(
              question.options
            )

          : question.options

    })
  )

const answers = ref({})

const currentQuestion = ref(0)

const timeLeft = ref(1500)

let timer = null

const formatTime = () => {

  const minutes =
    Math.floor(
      timeLeft.value / 60
    )

  const seconds =
    timeLeft.value % 60

  return `${minutes}:${seconds
    .toString()
    .padStart(2,'0')}`

}

onMounted(() => {

  timer = setInterval(() => {

    if (
      timeLeft.value > 0
    ) {

      timeLeft.value--

    } else {

      submitTest()

    }

  },1000)

})

onUnmounted(() => {

  clearInterval(timer)

})

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

  currentQuestion.value =
    index

}

const submitTest = () => {

  let correct = 0

  questions.forEach(
    question => {

      if (
        answers.value[
          question.id
        ] ===
        question.answer
      ) {

        correct++

      }

    }
  )

  const convertedScore =
    convertStructureScore(correct)

  clearInterval(timer)

  if (route.query.fullTest) {

    sessionStorage.setItem(
      'fullStructureCorrect',
      correct
    )

  }

  if (route.query.fullTest) {

    router.push(
      `/reading/${route.params.packageId}?fullTest=true`
    )

  } else {

    router.push({
      path:'/result',
      query:{

        section:'structure',

        correct,

        total:
          questions.length,

        converted:
          convertedScore

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
          Structure & Written Expression
        </h1>

        <p class="header-subtitle">
          TEP Exercise
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

          <span
            class="legend-box active"
          ></span>

          <span>
            Soal Aktif
          </span>

        </div>

        <div class="legend-item">

          <span
            class="legend-box answered"
          ></span>

          <span>
            Terisi
          </span>

        </div>

        <div class="legend-item">

          <span
            class="legend-box unanswered"
          ></span>

          <span>
            Belum Terisi
          </span>

        </div>

      </div>

      <button
        class="submit-btn"
        @click="submitTest"
      >
        Submit Test
      </button>

    </aside>

    <main class="content">

      <div class="question-card">

        <div class="question-info">

          Question

          {{
            questions[
              currentQuestion
            ].id
          }}

          of

          {{ questions.length }}

        </div>

        <!-- STRUCTURE -->

        <div
          v-if="
            questions[
              currentQuestion
            ].type ===
            'structure'
          "
        >

          <div
            class="question-title"
          >

            {{
              questions[
                currentQuestion
              ].question
            }}

          </div>

          <div
            class="structure-source"
          >

            Source:
            {{ structureTest.source }}

          </div>

        </div>

        <!-- WRITTEN EXPRESSION -->

        <template v-else>

          <div
            class="written-box"
          >

            <div
              class="written-text"
              v-html="
                questions[
                  currentQuestion
                ].html
              "
            ></div>

          </div>

          <div
            class="structure-source"
          >

            Source:
            {{ structureTest.source }}

          </div>

        </template>

        <div
          v-for="(
            option,
            index
          ) in questions[
            currentQuestion
          ].shuffledOptions"
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

          <div
            class="option-letter"
          >

            {{
              ['A','B','C','D']
              [index]
            }}

          </div>

          <div
            class="option-text"
          >

            {{ option }}

          </div>

        </div>

        <div
          class="navigation"
        >

          <button
            class="nav-btn secondary"
            @click="
              prevQuestion
            "
          >
            Previous
          </button>

          <button
            class="nav-btn primary"
            @click="
              nextQuestion
            "
          >
            Next
          </button>

        </div>

      </div>

    </main>

  </div>

</template>