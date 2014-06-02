
var g_radioCallback;
var g_myaudio
function setRadioStream(sourceUrl) {
    try {
    g_myaudio = new Audio(sourceUrl);
    g_myaudio.id = 'playerMyAdio';
    g_myaudio.play();
   } catch (e) {
    alert('no audio support!');
  } 
    /*
    var audio = $("#radiocontrols");
    $("#radiosource").attr("src", sourceUrl);
    audio[0].pause();
    audio[0].load();
    audio[0].play();*/
};

function refreshPlayerData() {
   console.log("refreshing the player data");

   
   var jqxhr = $.getJSON('http://api.jamendo.com/v3.0/radios/stream?client_id='+g_clientId+'&id='+sessionStorage.radioId+'&callback=?', null, null,'application/json')
   .done(function(result) {
      console.log(result.results[0]);
      window.clearInterval(g_radioCallback);
      g_radioCallback = window.setInterval("refreshPlayerData()",result.results[0].callmeback);
      setPlayerInformation(result.results[0].playingnow);
   })
   .fail(function() { console.log( "error" ); });
};

function setPlayerInformation(nowPlaying){
   $("#trackcover").attr("src", nowPlaying.track_image);
   $('#artist').empty();
   $('#artist').append('<h3>'+nowPlaying.artist_name + ' - '+ nowPlaying.track_name+' </h3>');
   $('#album').empty();
   $('#album').append('<h5>from album: '+nowPlaying.album_name + ' </h5>');
};

$( document ).delegate("#radioPage", "pagebeforeshow", function()  {
   
   var jqxhr = $.getJSON('http://api.jamendo.com/v3.0/radios/stream?client_id='+g_clientId+'&id='+sessionStorage.radioId+'&callback=?', null, null,'application/json')
   .done(function(result) {

      //write the header
      $('#radioHeader #radioName').text(result.results[0].dispname); 
    
      console.log(result.results[0]);
      setRadioStream(result.results[0].stream);
      
      g_radioCallback = window.setInterval("refreshPlayerData()",result.results[0].callmeback);
      setPlayerInformation(result.results[0].playingnow);
   })
   .fail(function() { console.log( "error" ); });
});

$( document ).delegate("#radioPage", "pagebeforehide", function()  {
   g_myaudio.pause();
   /*
   var audio = $("#radiocontrols");
   audio[0].pause();
   window.clearInterval(g_radioCallback);*/
});
