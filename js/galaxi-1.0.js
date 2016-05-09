function create_album(albumName, albumAltName, albumTotalFiles ,albumDesc = "No description available")
{
  var htmlHelper = '';
  htmlHelper += '<div class="album-cover">';
  htmlHelper += '<div class="thumb-wrapper">';
  htmlHelper += '<div class="thumbnail">';
  htmlHelper += '<a class="show-album">';
  htmlHelper += '<img src="albums/' + albumName + '/thumbnail/thumb.jpg" alt="thumbnail.jpg" onclick="create_photo_array(' + albumName + ',' + albumTotalFiles + ')" />';
  htmlHelper += '</a>';
  htmlHelper += '<hr>';
  htmlHelper += '<div class="album-name">';
  htmlHelper += '<a href="javascript:create_photo_array(' + albumName + ',' + albumTotalFiles + ')">';
  htmlHelper += albumAltName;
  htmlHelper += '</a>';
  htmlHelper += '</div>';
  htmlHelper += '</div>';
  htmlHelper += '</div>';
  htmlHelper += '</div>';
  return htmlHelper;
}

function create_photo(albumName, fileCounter, fileName = "img_")
{
  var htmlHelper = '';
  htmlHelper += '<a href="albums/'+albumName+'/img/'+fileName+''+fileCounter+'.jpg"';
  htmlHelper += 'class="fancybox-thumbs" data-fancybox-group="thumb">';
  htmlHelper += '<img src="albums/'+albumName+'/img/'+fileName+''+fileCounter+'.jpg" class="img1"';
  htmlHelper += 'alt="imagen zika">';
  htmlHelper += '</a>';
  return htmlHelper;
}

/*function create_album_array(albumCounter, albumName, albumTotFiles)
{
  var htmlHelper = '';
  for(var alfa = 0; alfa < albumCounter; alfa ++)
  {
    htmlHelper += create_album(albumName, albumTotFiles);
  }
  return htmlHelper;
}*/

function create_photo_array(albumName, albumTotalFiles )
{
  var htmlHelper = '';
  htmlHelper += '<center>';
  for(var alfa = 0; alfa < albumTotalFiles; alfa ++)
  {
    htmlHelper += create_photo(albumName, alfa);
  }
  htmlHelper += '</center>';
  return htmlHelper;
}
