var ctx = document.getElementById('barchart').getContext('2d');
var barchart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Africa', 'Asia', 'Australia', 'Europa', 'North America', 'South America'],
        datasets: [{
            label: 'Neonatal Mortality Rates',
            data : [21.252387,13.278613,10.415690,3.440991,3.363487,9.070503],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        layout: {
            padding: 10,
            
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});