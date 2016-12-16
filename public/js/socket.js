var socket = io.connect('http://127.0.0.1:3001');

socket.on('result', function(data){
  updateChart(myChart, data);
});

function updateChart(chart, data){
  chart.data.datasets[0].data[0] = data[0];
  chart.data.datasets[0].data[1] = data[1];
  chart.data.datasets[0].data[2] = data[2];
  chart.update();
}
