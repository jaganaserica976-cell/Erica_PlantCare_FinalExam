
<template>
  <div class="goals-page">
    <div class="page-heading">
      <p class="eyebrow">GROW WITH PURPOSE 🌱</p>
      <h1>My Goals 🎯</h1>
      <p>Set your goals and build better plant-care habits.</p>
    </div>

    <div class="goal-card">
      <div class="goal-icon">💧</div>
      <div class="goal-info">
        <h3>Water my plants on time</h3>
        <p>Keep a consistent watering schedule.</p>
        <div class="progress-bar">
          <div class="progress" style="inline-size: 70%"></div>
        </div>
        <small>70% completed</small>
      </div>
    </div>

    <div class="goal-card">
      <div class="goal-icon">🪴</div>
      <div class="goal-info">
        <h3>Grow my plant collection</h3>
        <p>Add and care for more plants.</p>
        <div class="progress-bar">
          <div class="progress" style="inline-size: 40%"></div>
        </div>
        <small>40% completed</small>
      </div>
    </div>

    <div class="goal-card">
      <div class="goal-icon">🍃</div>
      <div class="goal-info">
        <h3>Learn new plant-care skills</h3>
        <p>Learn about sunlight, soil, and fertilizer.</p>
        <div class="progress-bar">
          <div class="progress" style="inline-size: 55%"></div>
        </div>
        <small>55% completed</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.goals-page {
  color: #294a35;
}

.page-heading {
  margin-block-end: 28px;
}

.eyebrow {
  color: #56815e;
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: bold;
}

.page-heading h1 {
  margin-block-end: 8px;
}

.page-heading p:last-child {
  color: #718174;
}

.goal-card {
  background: white;
  border: 1px solid #e4ece1;
  border-radius: 16px;
  padding: 24px;
  margin-block-end: 18px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.goal-icon {
  font-size: 34px;
  background: #edf5e9;
  border-radius: 12px;
  padding: 12px;
}

.goal-info {
  flex: 1;
}

.goal-info h3 {
  margin-block-start: 0;
}

.goal-info p,
.goal-info small {
  color: #748376;
}

.progress-bar {
  block-size: 9px;
  background: #e9eee7;
  border-radius: 10px;
  overflow: hidden;
  margin: 16px 0 8px;
}

.progress {
  block-size: 100%;
  background: #438052;
  border-radius: 10px;
}
</style>
