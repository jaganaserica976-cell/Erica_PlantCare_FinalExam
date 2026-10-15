```vue
<template>
  <div class="container py-4">
    <h1 class="fw-bold mb-2">Care Logs 📝</h1>
    <p class="text-muted">
      Record and manage your plant care activities.
    </p>

    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h2 class="h5 fw-bold">
          {{ editingId === null ? 'Add Care Log' : 'Edit Care Log' }}
        </h2>

        <form @submit.prevent="saveLog">
          <div class="mb-3">
            <label class="form-label">Plant</label>
            <select v-model="form.plantId" class="form-select" required>
              <option value="" disabled>Select a plant</option>
              <option
                v-for="plant in plantStore.plants"
                :key="plant.id"
                :value="plant.id"
              >
                {{ plant.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Activity</label>
            <select v-model="form.activity" class="form-select" required>
              <option value="" disabled>Select activity</option>
              <option>Watering</option>
              <option>Fertilizing</option>
              <option>Pruning</option>
              <option>Repotting</option>
              <option>Other</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Date</label>
            <input
              v-model="form.date"
              type="date"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Notes</label>
            <textarea
              v-model="form.notes"
              class="form-control"
              rows="3"
              placeholder="Write care activity notes"
            ></textarea>
          </div>

          <button
            type="submit"
            class="btn btn-success me-2"
            :disabled="plantStore.plants.length === 0"
          >
            {{ editingId === null ? 'Add Log' : 'Save Changes' }}
          </button>

          <button
            v-if="editingId !== null"
            type="button"
            class="btn btn-secondary"
            @click="resetForm"
          >
            Cancel
          </button>
        </form>

        <p
          v-if="plantStore.plants.length === 0"
          class="text-danger mt-3"
        >
          Add a plant first before creating a care log.
        </p>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-body">
        <h2 class="h5 fw-bold mb-3">Care History</h2>

        <p v-if="sortedLogs.length === 0" class="text-muted">
          No care logs yet.
        </p>

        <div v-else class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-success">
              <tr>
                <th>Plant</th>
                <th>Activity</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="log in sortedLogs" :key="log.id">
                <td>{{ plantName(log.plantId) }}</td>
                <td>{{ log.activity }}</td>
                <td>{{ log.date }}</td>
                <td>{{ log.notes || '—' }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-primary me-2 mb-1"
                    @click="editLog(log)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger mb-1"
                    @click="removeLog(log.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import {
  plantStore,
  addLog,
  updateLog,
  deleteLog,
  plantName
} from '../stores/plantStore'

const editingId = ref(null)

function emptyForm() {
  return {
    plantId: '',
    activity: '',
    date: new Date().toISOString().slice(0, 10),
    notes: ''
  }
}

const form = reactive(emptyForm())

const sortedLogs = computed(() =>
  [...plantStore.logs].sort((a, b) =>
    (b.date || '').localeCompare(a.date || '')
  )
)

function resetForm() {
  editingId.value = null
  Object.assign(form, emptyForm())
}

function saveLog() {
  if (!form.plantId || !form.activity || !form.date) return

  const logData = {
    plantId: Number(form.plantId),
    activity: form.activity,
    date: form.date,
    notes: form.notes.trim()
  }

  if (editingId.value !== null) {
    updateLog(editingId.value, logData)
  } else {
    addLog(logData)
  }

  resetForm()
}

function editLog(log) {
  editingId.value = log.id
  Object.assign(form, {
    plantId: log.plantId,
    activity: log.activity,
    date: log.date,
    notes: log.notes || ''
  })

  window.scrollTo(0, 0)
}

function removeLog(id) {
  if (confirm('Are you sure you want to delete this care log?')) {
    deleteLog(id)
    if (editingId.value === id) resetForm()
  }
}

</script>
