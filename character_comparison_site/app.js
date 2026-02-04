new Vue({
    el: '#app',
    data: {
        characters: [],
        selectedCharacters: []
    },
    mounted() {
        this.fetchData();
    },
    watch: {
        selectedCharacters() {
            this.updateChart();
        }
    },
    methods: {
        fetchData() {
            fetch('characters.json')
                .then(response => response.json())
                .then(data => {
                    this.characters = data;
                });
        },
        updateChart() {
            const selectedData = this.characters.filter(character => this.selectedCharacters.includes(character.Name));
            const labels = ['武勇', '技能', '魅力', '知略'];
            const datasets = selectedData.map(character => {
                return {
                    label: character.Name,
                    data: [character.武勇, character.技能, character.魅力, character.知略],
                    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
                    borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                    borderWidth: 1
                };
            });

            const ctx = document.getElementById('radarChart').getContext('2d');
            if (this.chart) {
                this.chart.destroy();
            }
            this.chart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    scale: {
                        ticks: {
                            beginAtZero: false,
                            min: 30,
                            max: 100
                        }
                    }
                }
            });
        }
    }
});
