<template>
  <div class="position-absolute-center w-100" style="padding:0 100px;">
    <VueGoodTable :columns="columns" :rows="rows"/>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { VueGoodTable } from 'vue-good-table-next'
import 'vue-good-table-next/dist/vue-good-table-next.css'

// data
const columns = reactive([
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Age',
    field: 'age',
    type: 'number'
  },
  {
    label: 'Created On',
    field: 'createdAt',
    type: 'date',
    dateInputFormat: 'yyyy-MM-dd',
    dateOutputFormat: 'MMM do yy'
  },
  {
    label: 'Percent',
    field: 'score',
    type: 'percentage'
  }
])
const rows = reactive([
  { id: 1, name: '華威', age: 22, createdAt: '2023-03-10', score: 28.0 },
  { id: 2, name: '米知', age: 20, createdAt: '2023-01-01', score: 30.5 },
  { id: 3, name: '小明', age: 25, createdAt: '2023-02-05', score: 45.2 },
  { id: 4, name: '艾倫', age: 30, createdAt: '2023-05-20', score: 42.3 },
  { id: 5, name: '莉莉', age: 28, createdAt: '2023-04-15', score: 39.8 },
  { id: 6, name: '瑪莉', age: 24, createdAt: '2023-07-30', score: 33.6 },
  { id: 7, name: '威廉', age: 26, createdAt: '2023-06-25', score: 37.1 }
])

console.log('columns', columns)
console.log('rows', rows)
</script>

<style lang='scss' scope></style>
