var socket = io.connect('http://127.0.0.1:3001');


socket.on('result', function(data){
  //updateChart(myChart, data);
  console.log(data);
  console.log((data[0]/data[3]));
  var fillon_position = $('#fillon').position();
  var macron_position = $('#macron').position();
  var valls_position = $("#valls").position();

  /*FILLON*/
  $( "#fillon img" ).animate({
    left: (data[0]/data[3]),
  }, 0, function() {
  });
  $( "#fillon .rainbow" ).css({
    width : (data[0]/data[3])+15,
  }, 0, function() {
  });

  /*MACRON*/
  $( "#macron img" ).animate({
    left: (data[1]/data[3]),
  }, 0, function() {
  });
  $( "#macron .rainbow" ).css({
    width : (data[1]/data[3])+15,
  }, 0, function() {
  });

  /*VALLS*/
  $( "#valls img" ).animate({
    left: (data[2]/data[3]),
  }, 0, function() {
  });
  $( "#valls .rainbow" ).css({
    width : (data[2]/data[3])+15,
  }, 0, function() {
  });
});

function updateChart(chart, data){
  chart.data.datasets[0].data[0] = data[0];
  chart.data.datasets[0].data[1] = data[1];
  chart.data.datasets[0].data[2] = data[2];
  chart.data.datasets[0].data[3] = data[3];


  chart.update();
}
