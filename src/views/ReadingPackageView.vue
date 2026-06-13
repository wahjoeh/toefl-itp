<script setup>
import logo from '../assets/logo.png'
import { useRouter } from 'vue-router'

const router = useRouter()

const packages = [
  {
    id: 'paket-soal-1',
    title: 'Paket Soal 1',
    description:
      '50 Questions • 5 Passages'
  },
  {
    id: 'paket-soal-2',
    title: 'Paket Soal 2',
    description:
      '50 Questions • 5 Passages'
  }
]

const openPackage = packageId => {
  router.push(`/reading/${packageId}`)
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
          Ujian CBT
        </h1>

        <p class="header-subtitle">
          TOEFL ITP Reading Packages
        </p>

      </div>

    </div>

  </header>

  <div class="package-page">

    <div class="package-wrapper">

      <h2 class="page-title">
        Pilih Paket Soal Reading
      </h2>

      <p class="page-description">
        Pilih paket soal yang ingin dikerjakan.
      </p>

      <div class="package-grid">

        <div
          v-for="pkg in packages"
          :key="pkg.id"
          class="package-card"
          @click="openPackage(pkg.id)"
        >

          <div class="package-icon">
            📖
          </div>

          <h3>
            {{ pkg.title }}
          </h3>

          <p>
            {{ pkg.description }}
          </p>

          <button class="start-btn">
            Mulai
          </button>

        </div>

      </div>

    </div>

  </div>

</template>

<style src="../assets/reading-package.css"></style>