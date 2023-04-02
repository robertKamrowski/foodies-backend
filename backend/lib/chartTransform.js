const chartTransform = (arr) => {
   const labelsAndData = arr.map((item) => ({
      label: item.date,
      data: item.weight
   }))

   labelsAndData.sort((a, b) => a.label.localeCompare(b.label))

   return {
      labels: labelsAndData.map(({ label }) => label),
      datasets: [
         {
            label: 'Waga',
            data: labelsAndData.map(({ data }) => data)
         }
      ]
   }
}

module.exports = { chartTransform }
