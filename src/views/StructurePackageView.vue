<script setup>
import logo from '../assets/logo.png'
import { useRouter } from 'vue-router'

import '../assets/structure.css'

const router = useRouter()

const packages = [
  {
    id: 'paket-soal-1',
    title: 'Paket Soal 1',
    description: '40 Questions'
  },
  {
    id: 'paket-soal-2',
    title: 'Paket Soal 2',
    description: '40 Questions'
  }
]

const openPackage = packageId => {
  router.push(
    `/structure/${packageId}`
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
          Structure & Written Expression Section
        </h1>

        <p class="header-subtitle">
          TEP Exercise Online
        </p>

      </div>

    </div>

  </header>

  <div class="package-page">

    <div class="package-wrapper">

      <h2 class="page-title">
        Pilih Paket Soal Structure
      </h2>

      <div class="package-grid">

        <div
          v-for="pkg in packages"
          :key="pkg.id"
          class="package-card"
          @click="openPackage(pkg.id)"
        >

          <div class="package-icon">
            📝
          </div>

          <h3>
            {{ pkg.title }}
          </h3>

          <p>
            {{ pkg.description }}
          </p>

          <button class="start-btn">
            Mulai Test
          </button>

        </div>

      </div>

    </div>

  </div>

</template>