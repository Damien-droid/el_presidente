var socket = io.connect('http://127.0.0.1:3001');

socket.on('result', function(data){
  updateChart(myChart, data);
});

function updateChart(chart, data){
  chart.data.datasets[0].data[0] = data[0];
  chart.data.datasets[0].data[1] = data[1];

chart.update();


}
// function chart(){
//   var ctx = document.getElementById("myChart");
//   var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Macron", "Fillon"],
//         datasets: [{
//             label: '# of Votes',
//             data: [0,0,10],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
//   });
// }
