
$('#Lisainfo').click(function() {
    $('.mahuti-kihid').addClass("nähtamatu");
    $('.mahuti-legend').addClass("nähtamatu");
    $('.mahuti-lisainfo').removeClass("nähtamatu");
    $(this).addClass("sees");
    $('#Kihid').removeClass("sees");
    $('#Legend').removeClass("sees");
});
$('#Kihid').click(function() {
    $('.mahuti-kihid').removeClass("nähtamatu");
    $('.mahuti-legend').addClass("nähtamatu");
    $('.mahuti-lisainfo').addClass("nähtamatu");
    $(this).addClass("sees");
    $('#Legend').removeClass("sees");
    $('#Lisainfo').removeClass("sees");
});
$('#Legend').click(function() {
    $('.mahuti-kihid').addClass("nähtamatu");
    $('.mahuti-legend').removeClass("nähtamatu");
    $('.mahuti-lisainfo').addClass("nähtamatu");
    $(this).addClass("sees");
    $('#Kihid').removeClass("sees");
    $('#Lisainfo').removeClass("sees");
});
$(window).on('load',function(){
    $('#exampleModal').modal('show');
});
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});
$(document).ready(function () {
    $('.paneeli-pilt').on('click', function () {
      var image = $(this).attr('src');
      $('#myModal').on('show.bs.modal', function () {
          $(".showimage").attr("src", image);
      });
    });
});
