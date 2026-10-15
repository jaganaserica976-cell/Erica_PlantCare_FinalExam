

const plants = ref([])

const addPlant = (plant) => {
  plants.value.push(plant)
}

const updatePlant = (id, updatedPlant) => {
  const index = plants.value.findIndex(plant => plant.id === id)
  if (index !== -1) {
    plants.value[index] = { ...plants.value[index], ...updatedPlant }
  }
}

const deletePlant = (id) => {
  plants.value = plants.value.filter(plant => plant.id !== id)
}

export default {
  plants,
  addPlant,
  updatePlant,
  deletePlant
}   