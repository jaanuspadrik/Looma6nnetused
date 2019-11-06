$('#exampleModal').on('shown.bs.modal', function () {
  $('#video1')[0].play();
})
$('#exampleModal').on('hidden.bs.modal', function () {
  $('#video1')[0].pause();
})
