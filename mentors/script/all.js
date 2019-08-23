function preventBack ()
      {
        window.history.forward();
      }

      setTimeout("preventBack()", 0);
      window.onunload = function (){null};


const icon = document.getElementsByClassName('icon');
icon[0].onclick = () => {
  const navbar = document.querySelector('nav');
  if (navbar.className === 'topNav' || navbar.className === 'topNav ') {
    navbar.className += ' responsiveNav';
  } else {
    navbar.className = 'topNav';
  }
};



        