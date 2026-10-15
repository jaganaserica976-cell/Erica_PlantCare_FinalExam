import { ref, computed } from 'vue'

export function usePlants() {
  const plants = ref([
    {
      id: 1,
      name: 'Monstera',
      type: 'Indoor',
      watering: 'Every 7 days',
    },
    {
      id: 2,
      name: 'Snake Plant',
      type: 'Indoor',
      watering: 'Every 14 days',
    },
    {
      id: 3,
      name: 'Peace Lily',
      type: 'Flowering',
      watering: 'Every 5 days',
    },
  ])

  const totalPlants = computed(() => plants.value.length)

  function addPlant(plant) {
    plants.value.push({
      ...plant,
      id: Date.now(),
    })
  }

  function deletePlant(id) {
    plants.value = plants.value.filter(
      (plant) => plant.id !== id
    )
  }

  return {
    plants,
    totalPlants,
    addPlant,
    deletePlant,
  }
}