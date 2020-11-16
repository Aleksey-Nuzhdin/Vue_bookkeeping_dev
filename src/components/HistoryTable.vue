<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ 'Amount' | localizeFilter }}</th>
        <th>{{ 'Date' | localizeFilter }}</th>
        <th>{{ 'Category' | localizeFilter }}</th>
        <th>{{ 'Type' | localizeFilter }}</th>
        <th>{{ 'Open' | localizeFilter }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(rec, index) of records" :key="rec.id">
        <td>{{ ++index }}</td>
        <td>{{ rec.amount | currencyFilter }}</td>
        <td>{{ rec.date.slice(0, 10) }}</td>
        <td>{{ rec.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="rec.class">{{
            rec.text
          }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push(`/detail/${rec.id}`)"
            v-tooltip="ViewRecording"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ['records'],
  data: () => ({
    ViewRecording:localizeFilter('ViewRecording')
  })
}
</script>
