var ctx5 = document.getElementById('line').getContext('2d');
var line = new Chart(ctx5, {
    type: 'line',
    data: {
        labels: ['1.Month', '2.Month', '3.Month', '4.Month', '5.Month', '6.Month', '7.Month', '8.Month', '9.Month', '10.Month', '11.Month', '12.Month'],

        datasets: [{
            label: 'Average Baby Weight - Boys',
            data: [4.5, 5.6, 6.4, 7.0, 7.5, 7.9, 8.3, 8.6, 8.9, 9.2, 9.4, 9.6],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }, {
            label: 'Average Baby Weight - Girls',
            data: [4.2, 5.1, 5.8, 6.4, 7.0, 7.3, 7.6, 8.0, 8.2, 8.5, 8.7, 9.0],
            fill: false,
            borderColor: 'rgb(192, 75, 192)',
            tension: 0.1
        }]
    },
    options: {
        layout: {
            padding: 20
        },
        animations: {
            tension: {
              duration: 750,
              easing: 'linear',
              from: 1.15,
              to: 0,
              loop: true
            }
        },
        scales: {
            y: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    },
});
