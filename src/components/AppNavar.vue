<template>
  <nav class="navar navar-expand-lg navar-dark plant-navar">
    <div class="container">
      <RouterLink to="/" class="navar-brand fw-bold">
        🌿 PlantCare
      </RouterLink>

      <button
        class="navar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#plantNavar"
        aria-controls="plantNavar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navar-toggler-icon"></span>
      </button>

      <div class="collapse navar-collapse" id="plantNavar">
        <div class="navar-nav ms-auto">
          <RouterLink to="/" class="nav-link">Dashboard</RouterLink>
          <RouterLink to="/plants" class="nav-link">My Plants</RouterLink>
          <RouterLink to="/care-logs" class="nav-link">Care Logs</RouterLink>
          <RouterLink to="/tips" class="nav-link">Care Tips</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>