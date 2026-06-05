<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/reading.css'
import { questions } from '../data/reading'

const router = useRouter()

const answers = ref({})
const currentQuestion = ref(0)

const timeLeft = ref(3600)

const formatTime = () => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60

  return `${minutes}:${seconds
    .toString()
    .padStart(2, '0')}`
}

let timer = null

onMounted(() => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      submitTest()
    }
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const nextQuestion = () => {
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++
  }
}

const prevQuestion = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
  }
}

const goToQuestion = (index) => {
  currentQuestion.value = index
}

const submitTest = () => {
  let correct = 0

  questions.forEach((question) => {
    if (answers.value[question.id] === question.answer) {
      correct++
    }
  })

  clearInterval(timer)

  router.push({
    path: '/result',
    query: {
      score: correct,
      total: questions.length
    }
  })
}
</script>

<template>
  <div class="exam-container">

    <aside class="sidebar">
      <h2 class="sidebar-title">
        Question List
      </h2>

      <div class="question-grid">
        <button
          v-for="(question, index) in questions"
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

      <button
        class="submit-btn"
        @click="submitTest"
      >
        Submit Test
      </button>
    </aside>

    <main class="content">

      <div class="timer-box">
        Time Remaining: {{ formatTime() }}
      </div>

      <h2 class="question-title">
        Question {{ currentQuestion + 1 }}
      </h2>

      <p class="question-text">
        {{ questions[currentQuestion].question }}
      </p>

      <div
        v-for="option in questions[currentQuestion].options"
        :key="option"
        class="option"
      >
        <input
          type="radio"
          :name="'question-' + questions[currentQuestion].id"
          :value="option"
          v-model="answers[questions[currentQuestion].id]"
        />

        <label>
          {{ option }}
        </label>
      </div>

      <div class="navigation">
        <button
          class="nav-btn"
          @click="prevQuestion"
        >
          Previous
        </button>

        <button
          class="nav-btn"
          @click="nextQuestion"
        >
          Next
        </button>
      </div>

    </main>

  </div>
</template>