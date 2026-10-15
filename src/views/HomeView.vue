
<template>
  <div class="dashboard">
    <div class="welcome-banner">
      <div>
        <p class="eyebrow">YOUR LITTLE GREEN SPACE 🌱</p>
        <h1>Welcome to PlantCare!</h1>
        <p>Take care of your plants, one day at a time.</p>
      </div>
      <div class="plant-illustration">🪴</div>
    </div>

    <h2 class="section-title">Your Garden Overview</h2>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">🌿</div>
        <p>Total Plants</p>
        <h2>12</h2>
        <span>Your growing collection</span>
      </div>

      <div class="stat-card">
        <div class="stat-icon">💧</div>
        <p>Need Water</p>
        <h2>3</h2>
        <span>Check your plants today</span>
      </div>

      <div class="stat-card">
        <div class="stat-icon">✅</div>
        <p>Tasks Completed</p>
        <h2>5</h2>
        <span>Great job taking care!</span>
      </div>
    </div>

    <div class="content-grid">
      <div class="content-card">
        <h2>🌱 Today's Plant Care</h2>

        <div class="task">
          <span>💧</span>
          <div>
            <strong>Water your Monstera</strong>
            <p>Morning watering routine</p>
          </div>
        </div>

        <div class="task">
          <span>☀️</span>
          <div>
            <strong>Check sunlight</strong>
            <p>Make sure your plants get enough light</p>
          </div>
        </div>

        <div class="task">
          <span>🍃</span>
          <div>
            <strong>Inspect plant leaves</strong>
            <p>Look for yellow or damaged leaves</p>
          </div>
        </div>
      </div>

      <div class="content-card tip-card">
        <div class="tip-icon">🌼</div>
        <h2>Plant Care Tip</h2>
        <p>
          Check the soil before watering. If the top layer is still
          moist, your plant may not need water yet.
        </p>
        <p class="tip-footer">Small steps make healthy plants!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  color: #254b35;
}

.welcome-banner {
  background: linear-gradient(120deg, #e1f0dc, #f4f8e9);
  border-radius: 20px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-block-end: 30px;
}

.eyebrow {
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: bold;
  color: #54815c;
}

.welcome-banner h1 {
  font-size: clamp(25px, 4vw, 36px);
  margin: 12px 0;
}

.welcome-banner p {
  line-height: 1.6;
}

.plant-illustration {
  font-size: 85px;
}

.section-title {
  margin-block-end: 18px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  scroll-margin-block-end: 25px;
}

.stat-card,
.content-card {
  background: white;
  padding: 23px;
  border: 1px solid #e7eee4;
  border-radius: 16px;
  box-shadow: 0 4px 15px #254b3508;
}

.stat-icon {
  font-size: 30px;
}

.stat-card p {
  color: #607767;
  margin-block-end: 8px;
}

.stat-card h2 {
  font-size: 32px;
  margin: 5px 0;
}

.stat-card span {
  color: #7b8b7e;
  font-size: 12px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
}

.content-card h2 {
  font-size: 19px;
  margin-block-start: 0;
  margin-block-end: 22px;
}

.task {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 14px 0;
  border-block-end: 1px solid #edf1eb;
}

.task:last-child {
  border-block-end: none;
}

.task > span {
  font-size: 24px;
}

.task p {
  color: #78877b;
  font-size: 13px;
  scroll-margin-block-end: 0;
  margin-block-start: 6px;
}

.tip-card {
  background: #f7faef;
}

.tip-icon {
  font-size: 42px;
}

.tip-card p {
  line-height: 1.8;
  color: #607767;
}

.tip-footer {
  font-weight: bold;
  color: #39734a !important;
}

@media (max-width: 700px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .welcome-banner {
    padding: 22px;
  }

  .plant-illustration {
    font-size: 55px;
  }
}
</style>
