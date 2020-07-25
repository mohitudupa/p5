// Controlls
let framerate_slider = document.getElementById('framerate-slider');
let velocity_slider = document.getElementById('velocity-slider');
let acceleration_slider = document.getElementById('acceleration-slider');


// Side nav
let is_nav_open = false;
let side_nav = document.getElementById("mySidenav")


function change_framerate(){
  frameRate(parseInt(framerate_slider.value));
}


function change_velocity(){
  VELOCITY_CONSTRAINT = parseInt(velocity_slider.value);
}


function change_acceleration(){
  ACCELERATION_CONSTRAINT = parseFloat(acceleration_slider.value);
}


function toggle_side_nav(){
  if(is_nav_open){
    side_nav.style.width = "0";
    is_nav_open = false;
  }
  else{
    side_nav.style.width = "250";
    is_nav_open = true;
  }
}


function toggle_full_screen(){
  if(document.webkitIsFullScreen){
    document.webkitExitFullscreen();
  }
  else{
    document.body.webkitRequestFullScreen();
  }
}


document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.ctrlKey && evt.keyCode == 67) {
    toggle_side_nav();
  }
  if (evt.ctrlKey && evt.keyCode == 70) {
    toggle_full_screen();
  }
};
