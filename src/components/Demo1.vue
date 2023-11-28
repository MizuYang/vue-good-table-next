<template>
  <div class="position-absolute-center w-100" style="padding:0 100px;">
    <VueGoodTable :columns="columns" :rows="rows"/>

    <!-- 設定排序 -->
    <section class="bg-gainsboro mt-10 p-5">
      <h3 class="text-18 fw-bold-5 mb-4">表格啟用排序功能</h3>
      <div class="d-flex align-items-center">
        <tempalte v-for="col in columns" :key="col.id">
          <div class="form-check me-10">
            <input class="form-check-input"
                   type="checkbox"
                   name="flexRadioDefault"
                   :id="col.field"
                   @change="col.sortable = !col.sortable"
                   checked>
            <label class="form-check-label" :for="col.field">
              {{ col.label }}
            </label>
          </div>
        </tempalte>
      </div>
    </section>

    <!-- 設定欄位名稱 -->
    <section class="bg-gainsboro mt-6 p-5">
      <h3 class="text-18 fw-bold-5 mb-4">修改表格 col 名稱</h3>
      <div class="d-flex align-items-center">
        <template v-for="col in columns" :key="col.id">
          <input type="text"
                 class="form-control mb-3"
                 v-model="col.label">
        </template>
      </div>
    </section>

    <!-- 設定欄位寬度 -->
    <section class="bg-gainsboro mt-6 p-5">
      <h3 class="text-18 fw-bold-5 mb-4">修改表格 col 寬度</h3>
      <div class="d-flex align-items-center">
        <template v-for="(col, idx) in colWidth" :key="`col-${idx}`">
          <input type="number"
                 class="form-control mb-3"
                 :value="col.width"
                 @input="updateColWidth($event,idx)">
        </template>
      </div>
    </section>

    <!-- 自訂 class -->
    <section class="bg-gainsboro mt-6 p-5">
      <h3 class="text-18 fw-bold-5 mb-4">自訂 class (選擇的 col 欄位會套用樣式)</h3>
      <div class="d-flex align-items-center">
        <div class='form-check mb-0 me-10'>
          <input class='form-check-input'
                 type='radio'
                 name='flexRadioDefault'
                 id='classControlNull'
                 value=""
                 v-model="useClassTdName">
          <label class='form-check-label'
                 for='classControlNull'>
            無
          </label>
        </div>
        <template v-for="col in columns" :key="`class-${col.field}`">
          <div class='form-check mb-0 me-10'>
            <input class='form-check-input'
                   type='radio'
                   name='flexRadioDefault'
                   :id='`classControl-${col.field}`'
                   :value="col.field"
                   v-model="useClassTdName">
            <label class='form-check-label'
                   :for='`classControl-${col.field}`'>
              {{ col.label }}
            </label>
          </div>
        </template>
      </div>
    </section>

    <!-- 設定隱藏欄位 -->
    <section class="bg-gainsboro mt-6 p-5">
      <h3 class="text-18 fw-bold-5 mb-4">設定隱藏欄位</h3>
      <div class="d-flex align-items-center">
        <div class='form-check mb-0 me-10'>
          <input class='form-check-input'
                 type='radio'
                 name='hideCol'
                 id='hideControlNull'
                 value=""
                 v-model="hideColName">
          <label class='form-check-label'
                 for='hideControlNull'>
            無
          </label>
        </div>
        <template v-for="col in columns" :key="`hide-${col.field}`">
          <div class='form-check mb-0 me-10'>
            <input class='form-check-input'
                   type='radio'
                   name='hideCol'
                   :id='`hideControl-${col.field}`'
                   :value="col.field"
                   v-model="hideColName">
            <label class='form-check-label'
                   :for='`hideControl-${col.field}`'>
              {{ col.label }}
            </label>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect, onMounted } from 'vue'
import { VueGoodTable } from 'vue-good-table-next'
import 'vue-good-table-next/dist/vue-good-table-next.css'

// data
const columns = reactive([
  {
    label: '姓名',
    field: 'name',
    sortable: true,
    width: ''
  },
  {
    label: '年齡',
    field: 'age',
    type: 'number',
    sortable: true,
    width: ''
  },
  {
    label: '建立日期',
    field: 'createdAt',
    type: 'date',
    dateInputFormat: 'yyyy-MM-dd',
    dateOutputFormat: 'MMM do yy',
    sortable: true,
    width: ''
  },
  {
    label: '分數',
    field: 'score',
    type: 'number',
    sortable: true,
    width: ''
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
const colWidth = reactive([
  {
    field: 'name',
    width: ''
  },
  {
    field: 'age',
    width: ''
  },
  {
    field: 'createdAt',
    width: ''
  },
  {
    field: 'score',
    width: ''
  }
])
const useClassTdName = ref('')
const hideColName = ref('')

onMounted(() => {
  getTableColWidth()
  setTimeout(() => {

  }, 1000)
})

// watchEffect
// class 控制 (選擇的 col 欄位會套用樣式)
watchEffect(() => {
  thClassInit()
  if (useClassTdName.value) {
    const idx = columns.findIndex(col => col.field === useClassTdName.value)
    columns[idx].thClass = 'bg-danger-s text-danger'
    columns[idx].tdClass = 'bg-danger-s text-light'
  }
})
// hide 控制
watchEffect(() => {
  colHideInit()
  if (hideColName.value) {
    const idx = columns.findIndex(col => col.field === hideColName.value)
    columns[idx].hidden = true
  }
})

function getTableColWidth () {
  const table = document.querySelector('#vgt-table')
  const thead = table.children[1]
  const tr = thead.children[0]
  const thArray = [...tr.children]
  thArray.forEach((th, idx) => {
    colWidth[idx].width = th.clientWidth
  })
}
function updateColWidth (e, idx) {
  columns[idx].width = `${e.target.value}px`
}
function thClassInit () {
  columns.forEach(col => {
    col.tdClass = ''
    col.thClass = ''
  })
}
function colHideInit () {
  columns.forEach(col => (col.hidden = false))
}
</script>

<style lang='scss' scope>
.bg-danger-s {
  background-color: rgba(255, 0, 0, 0.356) !important;
}
</style>
