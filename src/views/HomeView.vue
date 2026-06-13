<script setup>
import { useRouter } from 'vue-router'
import logo from '../assets/logo.png'

const router = useRouter()

const goToListening = () => {
  router.push('/listening')
}

const goToStructure = () => {
  router.push('/structure')
}

const goToReading = () => {
  router.push('/reading')
}

const goToFullTest = () => {
  router.push('/full-test')
}
</script>

<template>

  <div class="home-container">

    <div class="home-card">

      <img
        :src="logo"
        alt="Logo"
        class="home-logo"
      >

      <h1 class="home-title">
        TOEFL ITP Simulation
      </h1>

      <p class="home-subtitle">
        Practice Platform
      </p>

      <h2 class="section-title">
        Choose a Section
      </h2>

      <div class="menu-grid">

        <button
          class="menu-card"
          @click="goToListening"
        >
          <span class="menu-icon">
            🎧
          </span>

          <span>
            Listening Section
          </span>
        </button>

        <button
          class="menu-card"
          @click="goToStructure"
        >
          <span class="menu-icon">
            ✍️
          </span>

          <span>
            Written & Structure
          </span>
        </button>

        <button
          class="menu-card"
          @click="goToReading"
        >
          <span class="menu-icon">
            📖
          </span>

          <span>
            Reading Section
          </span>
        </button>

        <button
          class="menu-card"
          @click="goToFullTest"
        >
          <span class="menu-icon">
            📝
          </span>

          <span>
            Full Test
          </span>
        </button>

      </div>

    </div>

  </div>

</template>

<style src="../assets/home.css"></style>