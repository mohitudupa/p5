document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});


document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.ctrlKey && evt.keyCode == 67) {
    elem = document.getElementById('sidenav')
    var instance = M.Sidenav.getInstance(elem);
    if(instance.isOpen){
      instance.close();
    }
    else{
      instance.open()
    }
  }
};

