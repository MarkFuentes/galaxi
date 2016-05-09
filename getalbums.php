<?php
  require_once('includes/connection.php');

  $strHTML    = '<div id="album-manager"></div>';
  $strHTML   .= '<script>';
  $strQuery   = "SELECT * FROM ";
  $strQuery  .= "album";

  $result     = mysqli_query($conn, $strQuery);
  $totAlbums  = mysqli_num_rows($result);
  $contador   = 1;
  $strHTML   .= 'document.getElementById("album-manager").innerHTML=';
  while($row = mysqli_fetch_assoc($result))
  {
    $strHTML .= 'create_album(';
    $strHTML .= 'album_'.$contador; //Album name
    $strHTML .= ',';
    $strHTML .= $row["album_name"]; //Album alt name
    $strHTML .= ',';
    $strHTML .= $row["album_tot_files"];//Album total files
    $strHTML .=');';
  }

  $strHTML .= '</script>';
  echo $strHTML;
 ?>
