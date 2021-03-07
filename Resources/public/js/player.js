    
jQuery(function ($) {
    
    
    
    
    
    'use strict'
    
    
/*[
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]*/
 const player_main = new Plyr('#plyr-audio',{
            controls: [
                'play',
                'volume'
            ]
        });
        
        
        player_main.on('ended', event => {
            playerNextVideo();
        });


 
    
function playlistNbElement()
{
    return($("#playlist_main").children().length);
}

function playlistFirst()
{
    var videoCourante;
    if (playlistNbElement())
    {
        videoCourante=$("#playlist_main li:first");
        console.log(videoCourante);
        videoCourante.addClass("nowplaying");
        playerVideoPlay(videoCourante);
    }
}





function playerVideoPlay(track)
{
    console.log(track);
    
    
        
    $("#now_playing #titre").html(track.data("title"));
    $("#now_playing #album").html("<i class='fas fa-circle'> " + track.data("album") + "</i>");
    $("#now_playing #artist").html("<i class='icon-air_iench'> " + track.data("artist") + "</i>");
    $("#now_playing #poster").prop('src', track.data("poster"));
     
        player_main.source = {
            type: 'audio',
            title: 'ca marche',
            sources: [
                {
                    src:track.data("mp3path"),
                    type: 'audio/mp3' 
                } 
            ]
        };
        
        
 
        player_main.play();
      
}


	function playerNextVideo()
	{
                var videoCourante;
                var videoSuivante;
		videoCourante=$('.nowplaying');
                
                console.log(videoCourante);
                if (videoCourante.hasClass("nowplaying"))
                {
                    console.log("videoCourante.hasClass(nowplaying)");
                }
                else
                {
                    console.log("videoCourante.hasNotClass(nowplaying)");
                }
                
 		var playlist_position=($("#currentplaylist_liste").children().index(videoCourante)+1);
		if (playlist_position<playlistNbElement())
		{
                    videoSuivante=$('.nowplaying').next();
                    videoCourante.removeClass('nowplaying');
                    videoCourante.addClass('inqueueplayed');
                    videoSuivante.addClass("nowplaying");
                    playerVideoPlay(videoSuivante);
		}
		else 
		{
                    videoCourante.switchClass( 'nowplaying', 'inqueueplayed', 500);
                }
        }
        
function indexVideoCourante()        
{
    var videoCourante;
    videoCourante=$('.nowplaying');
    return(($("#currentplaylist_liste").children().index(videoCourante)+1));
}    

function majPlaylistNumberInfo()
{
    $('#nb_in_playlist').html("(" + playlistNbElement()+")");
}
	
$('#body').on('click', '.test', function() 
{
    playlistFirst();
    
});


$('#body').on('click', '.eject', function() 
{
    $("#playlist_main li:not(.nowplaying)").remove();
    majPlaylistNumberInfo();    
});



	
$('#body').on('click', '.previous-button', function() 
{
    
});

$('#body').on('click', '.next-button', function() 
{
    if (indexVideoCourante()<playlistNbElement())
    {
        playerNextVideo();
    }
});


function morceauItemHtml(item)
{
    console.log(item);
    
    return('<li data-poster="' + item.poster + '"  data-mp3path="' + item.mp3 + '"   data-album="' + item.album + '"  data-title="' + item.track  + '"  data-artist="' + item.artist + '" class="plItem"> \
                        <span class="plTitle"><img src="' + item.poster +'">' + item.artist + " - " + item.album + " - " +  item.track + '</span> \
                </li>');
}

function enqueueJson(url_json,play_first)
{
    $('#loading_playlist').show();
    $.getJSON( url_json)
    .done(function( data ) {
        console.log(data);
        console.log(data[0]);
      $.each( data, function( i, item ) {
            console.log(item);
              $('#playlist_main').append(morceauItemHtml(item));
      });

      majPlaylistNumberInfo();
      
      if (play_first)
      {
        playlistFirst();
      }
        $('#loading_playlist').hide();
        
    });
}

$('#body').on('click', '.player_json_enqueue', function() 
{
    var play_first;
    var url_json = $(this).data("json");
    
    if (! playlistNbElement())
    {
        play_first=true;
    }
    else
    {
        play_first=false;
    }
    enqueueJson(url_json,play_first)

});


$('#body').on('click', '.player_json_play', function() 
{
    $("#playlist_main li").remove();
    var url_json = $(this).data("json");
    enqueueJson(url_json,true);
});

function getTrackInPlaylistByMp3(mp3)
{
    var result=false;
      $( "#playlist_main li" ).each(function() 
        {
            console.log($(this).data("mp3path"));
            console.log(mp3);
            if ($(this).data("mp3path")==mp3)
            {
                result=($(this));
            }
        });
        return(result);
        
}

$('#body').on('click', '.morceau_add_or_play', function() 
{
        var item = {poster: $(this).data("poster"), mp3: $(this).data("mp3path"), album: $(this).data("album"),track:$(this).data("title"),artist:$(this).data("artist")};
        var find = false;
        var track=getTrackInPlaylistByMp3(item.mp3);
        if (! track)
        {
            $('#playlist_main').append(morceauItemHtml(item));
            track=getTrackInPlaylistByMp3(item.mp3);
        }
        playTrackPlaylist(track);
        majPlaylistNumberInfo();
     
});


$('#body').on('click', '.morceau_to_play', function() 
{
        player_main.source = {
            type: 'audio',
            title: 'ca marche',
            sources: [
                {
                    src: $(this).data("mp3path"),
                    type: 'audio/mp3' 
                } 
            ]
        };
        
        var item = {poster: $(this).data("poster"), mp3: $(this).data("mp3path"), album: $(this).data("album"),track:$(this).data("title"),artist:$(this).data("artist")};
        
        $('#playlist_main').append(morceauItemHtml(item));
         majPlaylistNumberInfo();
     

});


$('#body').on('click', '#playlist_main .plItem', function() 
{
    playTrackPlaylist($(this));
});

function playTrackPlaylist(track)
{
        $(".plItem").removeClass("nowplaying");
        track.addClass("nowplaying");
        playerVideoPlay(track);

}


  
});