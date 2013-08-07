
$( document ).delegate("#radioListPage", "pageinit", function() {
   
   var jqxhr = $.getJSON('http://api.jamendo.com/v3.0/radios?client_id='+g_clientId+'&callback=?', null, null,'application/json')
   .done(function(result) {
      console.log(result);

      
      var list = $("#radioList").listview();
      $(result.results).each(function(index){
         $(list).append('<li><a href="index.html#radioPage" data-transition="slide" onclick="sessionStorage.radioId=' + this.id+ '">'    
           + '<img src="'+this.image+'" class="ui-li-icon"/> <h3>' + this.dispname + '</h3></a> </li>');
      });

      $("#radioList").listview('refresh');
   })
   .fail(function() { console.log( "error" ); });
});
