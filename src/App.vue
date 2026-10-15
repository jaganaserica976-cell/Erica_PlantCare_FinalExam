
<template>
  <div class="app">
    <header class="navbar">
      <button class="brand" @click="page = 'Home'">🌿 PlantCare</button>
      <nav>
        <button
          v-for="item in pages"
          :key="item"
          :class="{ active: page === item }"
          @click="page = item"
        >
          {{ item }}
        </button>
      </nav>
    </header>

    <main class="container">
      <!-- HOME -->
      <section v-if="page === 'Home'">
        <div class="hero">
          <div>
            <p class="eyebrow">YOUR PERSONAL GARDEN ASSISTANT</p>
            <h1>Grow something beautiful. 🌱</h1>
            <p>Keep your plants healthy, organized, and happy.</p>
            <button class="primary" @click="openAdd">+ Add a Plant</button>
          </div>
          <div class="hero-plant">🪴</div>
        </div>

        <div class="stats">
          <article class="stat">
            <span>🌱</span>
            <p>Total Plants</p>
            <h2>{{ plants.length }}</h2>
          </article>
          <article class="stat">
            <span>💚</span>
            <p>Healthy Plants</p>
            <h2>{{ healthyCount }}</h2>
          </article>
          <article class="stat">
            <span>💧</span>
            <p>Care Records</p>
            <h2>{{ logs.length }}</h2>
          </article>
          <article class="stat">
            <span>🎯</span>
            <p>Active Goals</p>
            <h2>{{ goals.filter(g => !g.done).length }}</h2>
          </article>
        </div>

        <div class="section-heading">
          <div>
            <h2>My Garden</h2>
            <p>Your recently added plants</p>
          </div>
          <button class="secondary" @click="page = 'Plants'">
            View all →
          </button>
        </div>

        <div v-if="plants.length" class="plant-grid">
          <article
            v-for="plant in plants.slice(0, 3)"
            :key="plant.id"
            class="plant-card"
          >
            <div class="plant-picture">{{ plant.emoji }}</div>
            <div class="plant-info">
              <span class="badge">{{ plant.status }}</span>
              <h3>{{ plant.name }}</h3>
              <p>{{ plant.species || 'Plant species not specified' }}</p>
              <p>💧 {{ plant.frequency || 'Not specified' }}</p>
              <button class="secondary" @click="editPlant(plant)">
                Edit plant
              </button>
            </div>
          </article>
        </div>
        <p v-else class="empty">
          Your garden is waiting! Click “Add a Plant” to get started.
        </p>
      </section>

      <!-- PLANTS / CRUD -->
      <section v-else-if="page === 'Plants'">
        <div class="section-heading">
          <div>
            <p class="eyebrow">YOUR COLLECTION</p>
            <h1>My Plants 🌿</h1>
            <p>Add, view, edit, search, and delete your plants.</p>
          </div>
          <button class="primary" @click="openAdd">+ Add Plant</button>
        </div>

        <input
          v-model="search"
          class="search"
          placeholder="🔍 Search plant name or species..."
        />

        <form v-if="showForm" class="form-card" @submit.prevent="savePlant">
          <h2>{{ editingId ? 'Edit Plant' : 'Add New Plant' }}</h2>

          <label>Plant Name *
            <input v-model.trim="form.name" required placeholder="e.g. Snake Plant" />
          </label>

          <label>Species
            <input v-model.trim="form.species" placeholder="e.g. Dracaena trifasciata" />
          </label>

          <label>Watering Frequency
            <select v-model="form.frequency">
              <option>Every day</option>
              <option>Every 3 days</option>
              <option>Weekly</option>
              <option>Every 2 weeks</option>
              <option>Monthly</option>
            </select>
          </label>

          <label>Light Requirement
            <select v-model="form.light">
              <option>Bright indirect light</option>
              <option>Direct sunlight</option>
              <option>Low light</option>
              <option>Partial shade</option>
            </select>
          </label>

          <label>Plant Status
            <select v-model="form.status">
              <option>Healthy</option>
              <option>Needs Attention</option>
              <option>Recovering</option>
            </select>
          </label>

          <label>Notes
            <textarea v-model.trim="form.notes" placeholder="Add plant care notes..."></textarea>
          </label>

          <div class="actions">
            <button class="primary" type="submit">
              {{ editingId ? 'Save Changes' : 'Add Plant' }}
            </button>
            <button class="secondary" type="button" @click="cancelForm">
              Cancel
            </button>
          </div>
        </form>

        <div v-if="filteredPlants.length" class="plant-grid">
          <article
            v-for="plant in filteredPlants"
            :key="plant.id"
            class="plant-card"
          >
            <div class="plant-picture">{{ plant.emoji }}</div>
            <div class="plant-info">
              <span class="badge" :class="{ warning: plant.status !== 'Healthy' }">
                {{ plant.status }}
              </span>
              <h3>{{ plant.name }}</h3>
              <p>{{ plant.species || 'Species not specified' }}</p>
              <p>💧 {{ plant.frequency }}</p>
              <p>☀️ {{ plant.light }}</p>
              <p v-if="plant.notes">{{ plant.notes }}</p>
              <div class="actions">
                <button class="secondary" @click="editPlant(plant)">Edit</button>
                <button class="danger" @click="deletePlant(plant.id)">Delete</button>
              </div>
            </div>
          </article>
        </div>
        <p v-else class="empty">No plants found. Try another search or add a plant.</p>
      </section>

      <!-- DAILY CARE -->
      <section v-else-if="page === 'Daily Care'">
        <p class="eyebrow">PLANT CARE TRACKER</p>
        <h1>Daily Care 💧</h1>
        <p>Record watering, fertilizing, pruning, and other activities.</p>

        <form class="form-card" @submit.prevent="addLog">
          <h2>Record a Care Activity</h2>
          <label>Select Plant *
            <select v-model="logForm.plantId" required>
              <option disabled value="">Choose a plant</option>
              <option v-for="plant in plants" :key="plant.id" :value="plant.id">
                {{ plant.name }}
              </option>
            </select>
          </label>
          <label>Activity
            <select v-model="logForm.activity">
              <option>Watering</option>
              <option>Fertilizing</option>
              <option>Pruning</option>
              <option>Repotting</option>
              <option>Other</option>
            </select>
          </label>
          <label>Date
            <input v-model="logForm.date" type="date" required />
          </label>
          <label>Notes
            <textarea v-model.trim="logForm.notes" placeholder="What did you do?"></textarea>
          </label>
          <button class="primary" type="submit" :disabled="!plants.length">
            Save Care Record
          </button>
          <p v-if="!plants.length" class="hint">Add a plant before recording care.</p>
        </form>

        <h2 class="list-title">Care History</h2>
        <article v-for="log in logs" :key="log.id" class="record">
          <div>
            <strong>💧 {{ plantName(log.plantId) }}</strong>
            <p>{{ log.activity }} · {{ log.date }}</p>
            <p>{{ log.notes }}</p>
          </div>
          <button class="danger" @click="deleteLog(log.id)">Delete</button>
        </article>
        <p v-if="!logs.length" class="empty">No care records yet.</p>
      </section>

      <!-- GOALS -->
      <section v-else-if="page === 'Goals'">
        <p class="eyebrow">GROW WITH PURPOSE</p>
        <h1>Plant Care Goals 🎯</h1>
        <p>Create goals to build good plant-care habits.</p>

        <form class="inline-form" @submit.prevent="addGoal">
          <input v-model.trim="goalText" required placeholder="e.g. Water my plants every Sunday" />
          <button class="primary" type="submit">Add Goal</button>
        </form>

        <article v-for="goal in goals" :key="goal.id" class="record">
          <label class="goal-label">
            <input type="checkbox" v-model="goal.done" @change="saveGoals" />
            <span :class="{ completed: goal.done }">{{ goal.text }}</span>
          </label>
          <button class="danger" @click="deleteGoal(goal.id)">Delete</button>
        </article>
        <p v-if="!goals.length" class="empty">Your goals start here. Add one above!</p>
      </section>

      <!-- TIPS -->
      <section v-else-if="page === 'Tips'">
        <p class="eyebrow">LEARN AND GROW</p>
        <h1>Plant Care Tips 🌱</h1>
        <p>Simple reminders to help your plants thrive.</p>
        <div class="tips-grid">
          <article class="tip"><span>💧</span><h3>Water Wisely</h3><p>Check the soil before watering. Many plants prefer their topsoil to dry slightly between watering.</p></article>
          <article class="tip"><span>☀️</span><h3>Know the Light</h3><p>Learn your plant's light needs. Bright indirect light suits many popular indoor plants.</p></article>
          <article class="tip"><span>🪴</span><h3>Choose Good Pots</h3><p>Use pots with drainage holes to help prevent waterlogged soil and root problems.</p></article>
          <article class="tip"><span>🍃</span><h3>Check the Leaves</h3><p>Look for yellowing, pests, or unusual spots regularly so you can respond early.</p></article>
          <article class="tip"><span>🌿</span><h3>Prune Carefully</h3><p>Remove dead leaves with clean tools and avoid cutting healthy growth unnecessarily.</p></article>
          <article class="tip"><span>📝</span><h3>Track Your Routine</h3><p>Use Daily Care to record activities and learn which routine works for your plants.</p></article>
        </div>
      </section>

      <!-- ABOUT -->
      <section v-else-if="page === 'About'">
        <div class="about">
          <div class="hero-plant">🌿</div>
          <p class="eyebrow">ABOUT THE PROJECT</p>
          <h1>PlantCare Management System</h1>
          <p>A simple plant-care organizer built with Vue.js.</p>
          <h2>Project Features</h2>
          <ul>
            <li>Single-page navigation between six sections</li>
            <li>Reactive data using Vue's Composition API</li>
            <li>Plant CRUD: Create, Read, Update, and Delete</li>
            <li>Search, daily care logs, and goals</li>
            <li>Local storage to keep records in this browser</li>
          </ul>
          <p class="hint">Student project · Vue.js 3</p>
        </div>
      </section>
    </main>

    <footer>🌱 PlantCare Management System · Grow with care</footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const pages = ['Home', 'Plants', 'Daily Care', 'Goals', 'Tips', 'About']
const page = ref('Home')
const search = ref('')
const showForm = ref(false)
const editingId = ref(null)

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const plants = ref(readStorage('plantcare_plants', []))
const logs = ref(readStorage('plantcare_logs', []))
const goals = ref(readStorage('plantcare_goals', []))

watch(plants, value => localStorage.setItem('plantcare_plants', JSON.stringify(value)), { deep: true })
watch(logs, value => localStorage.setItem('plantcare_logs', JSON.stringify(value)), { deep: true })

const healthyCount = computed(() =>
  plants.value.filter(plant => plant.status === 'Healthy').length
)

const filteredPlants = computed(() => {
  const query = search.value.toLowerCase()
  return plants.value.filter(plant =>
    plant.name.toLowerCase().includes(query) ||
    (plant.species || '').toLowerCase().includes(query)
  )
})

const blankPlant = () => ({
  name: '',
  species: '',
  frequency: 'Weekly',
  light: 'Bright indirect light',
  status: 'Healthy',
  notes: '',
  emoji: '🪴'
})

const form = ref(blankPlant())

function openAdd() {
  page.value = 'Plants'
  editingId.value = null
  form.value = blankPlant()
  showForm.value = true
}

function editPlant(plant) {
  page.value = 'Plants'
  editingId.value = plant.id
  form.value = { ...plant }
  showForm.value = true
}

function cancelForm() {
  showForm.value = false
  editingId.value = null
  form.value = blankPlant()
}

function savePlant() {
  const name = form.value.name.trim()
  if (!name) return

  if (editingId.value !== null) {
    const index = plants.value.findIndex(p => p.id === editingId.value)
    if (index !== -1) {
      plants.value[index] = { ...form.value, name, id: editingId.value }
    }
  } else {
    plants.value.unshift({
      ...form.value,
      name,
      id: Date.now(),
      emoji: '🪴'
    })
  }
  cancelForm()
}

function deletePlant(id) {
  if (!confirm('Are you sure you want to delete this plant?')) return
  plants.value = plants.value.filter(p => p.id !== id)
  logs.value = logs.value.filter(log => log.plantId !== id)
}

const logForm = ref({
  plantId: '',
  activity: 'Watering',
  date: new Date().toLocaleDateString('en-CA'),
  notes: ''
})

function addLog() {
  if (!logForm.value.plantId) return
  logs.value.unshift({
    ...logForm.value,
    id: Date.now(),
    plantId: Number(logForm.value.plantId)
  })
  logForm.value = {
    plantId: '',
    activity: 'Watering',
    date: new Date().toLocaleDateString('en-CA'),
    notes: ''
  }
}

function plantName(id) {
  return plants.value.find(p => p.id === id)?.name || 'Plant removed'
}

function deleteLog(id) {
  logs.value = logs.value.filter(log => log.id !== id)
}

const goalText = ref('')

function saveGoals() {
  localStorage.setItem('plantcare_goals', JSON.stringify(goals.value))
}

function addGoal() {
  const text = goalText.value.trim()
  if (!text) return
  goals.value.push({ id: Date.now(), text, done: false })
  goalText.value = ''
  saveGoals()
}

function deleteGoal(id) {
  goals.value = goals.value.filter(goal => goal.id !== id)
  saveGoals()
}
</script>

<style>
:root {
  font-family: Inter, "Segoe UI", Arial, sans-serif;
  color: #203b2c;
  background: #f4f8f2;
  font-synthesis: none;
}
* { box-sizing: border-box; }
body { margin: 0; min-width: 320px; }
button, input, select, textarea { font: inherit; }
button { cursor: pointer; }
button:disabled { opacity: .5; cursor: not-allowed; }
.app { min-height: 100vh; }
.navbar {
  display: flex; align-items: center; justify-content: space-between;
  gap: 18px; flex-wrap: wrap; padding: 16px max(5%, calc((100% - 1150px) / 2));
  background: #17683e; color: white;
}
.brand { border: 0; background: none; color: white; font-size: 22px; font-weight: 800; }
nav { display: flex; flex-wrap: wrap; gap: 6px; }
nav button { border: 0; border-radius: 8px; padding: 9px 12px; background: transparent; color: white; }
nav button:hover, nav button.active { background: #ffffff25; }
.container { width: min(1100px, 90%); margin: 32px auto 56px; min-height: 65vh; }
h1 { margin: 8px 0 12px; font-size: clamp(28px, 4vw, 40px); }
h2 { margin-top: 0; }
p { line-height: 1.6; }
.eyebrow { color: #43865a; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; }
.hero {
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
  padding: clamp(24px, 5vw, 52px); border-radius: 24px;
  background: linear-gradient(120deg, #e2f2df, #f7f9e9);
}
.hero p { color: #536d5c; }
.hero-plant { font-size: clamp(65px, 12vw, 115px); }
.primary, .secondary, .danger {
  border: 0; border-radius: 9px; padding: 10px 15px; font-weight: 700;
}
.primary { color: white; background: #197344; }
.primary:hover { background: #105b34; }
.secondary { color: #17683e; background: #e6f2e8; }
.danger { color: #a52d2d; background: #fde8e6; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0 38px; }
.stat, .plant-card, .tip, .form-card, .about, .record {
  background: white; border: 1px solid #e1eae0; border-radius: 15px;
  box-shadow: 0 4px 15px #244a2010;
}
.stat { padding: 20px; }
.stat span { font-size: 25px; }
.stat p { margin: 9px 0 0; color: #607567; }
.stat h2 { margin: 2px 0 0; font-size: 30px; }
.section-heading { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin: 28px 0 20px; }
.section-heading h1, .section-heading h2 { margin: 0 0 6px; }
.section-heading p { margin: 0; color: #6b7d70; }
.plant-grid, .tips-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; margin-top: 22px; }
.plant-card { overflow: hidden; }
.plant-picture { display: grid; place-items: center; min-height: 110px; background: #e7f2e2; font-size: 65px; }
.plant-info { padding: 18px; }
.plant-info h3 { margin: 12px 0 5px; }
.plant-info p { color: #68796d; font-size: 14px; overflow-wrap: anywhere; }
.badge { display: inline-block; padding: 5px 9px; border-radius: 20px; background: #e1f5e5; color: #237442; font-size: 12px; font-weight: 700; }
.badge.warning { color: #885b0b; background: #fff0cb; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 15px; }
.search, .form-card input, .form-card select, .form-card textarea, .inline-form input {
  width: 100%; border: 1px solid #d6e1d5; border-radius: 9px; padding: 12px;
  color: #203b2c; background: white;
}
.search { margin-top: 18px; }
.form-card { max-width: 650px; padding: 24px; margin: 24px 0; }
.form-card label { display: block; margin: 15px 0; font-size: 14px; font-weight: 700; }
.form-card label input, .form-card label select, .form-card label textarea { display: block; margin-top: 7px; font-weight: 400; }
.form-card textarea { min-height: 85px; resize: vertical; }
.empty { padding: 30px; margin: 20px 0; text-align: center; color: #63786a; background: #eaf3e8; border-radius: 12px; }
.record { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px; margin: 12px 0; }
.record p { margin: 5px 0; color: #68796d; }
.inline-form { display: flex; gap: 10px; margin: 24px 0; }
.inline-form input { flex: 1; min-width: 0; }
.goal-label { display: flex; align-items: center; gap: 12px; }
.goal-label input { width: 18px; height: 18px; accent-color: #197344; }
.completed { color: #829087; text-decoration: line-through; }
.list-title { margin-top: 34px; }
.tip { padding: 24px; }
.tip span { font-size: 32px; }
.tip p { color: #63786a; }
.about { max-width: 750px; margin: auto; padding: clamp(24px, 5vw, 50px); }
.about li { margin: 12px 0; }
.hint { color: #738276; font-size: 13px; }
footer { padding: 24px; text-align: center; background: #e6f0e3; color: #526c59; }
@media (max-width: 760px) {
  .navbar { align-items: flex-start; }
  nav { width: 100%; }
  nav button { padding: 8px; }
  .stats { grid-template-columns: repeat(2, 1fr); }
  .plant-grid, .tips-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hero { align-items: flex-start; }
  .hero-plant { font-size: 60px; }
}
@media (max-width: 480px) {
  .plant-grid, .tips-grid { grid-template-columns: 1fr; }
  .section-heading { align-items: flex-start; flex-direction: column; }
  .inline-form { flex-direction: column; }
}
</style>
