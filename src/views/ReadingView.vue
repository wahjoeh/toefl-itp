<script setup>
import { questions } from '../data/reading'
</script>

<template>
  <div>
    <h1>Reading Test</h1>

    <div
      v-for="question in questions"
      :key="question.id"
    >
      <h3>{{ question.question }}</h3>

      <div
        v-for="option in question.options"
        :key="option"
      >
        <input type="radio">
        <label>{{ option }}</label>
      </div>

      <hr>
    </div>
  </div>
</template>