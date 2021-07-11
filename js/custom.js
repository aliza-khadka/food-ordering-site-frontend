    // console.log(window.innerWidth);
  /* if (window.innerWidth >= 765){
        document.querySelector(".fa-bars").style.display = "none";
    }
    else{
        document.querySelector(".fa-bars").style.display = "block";
    }*/

    $(document).ready(function(){
        $('.fa-bars').click(function(){
            console.log("Clicked.")
        $(this).toggleClass('fa-times');
        $('nav').toggleClass('nav-toggle');
    });
        
     $('nav ul li a').click(function(){
        $('.fa-bars').removeClass('fa-times');
        $('nav').removeclass('nav-toggle');
    });

    $('.next').click(function(){
        $('.vid1').css('display','none');
        $('.vid2').css('display','block');
        $('.vid3').css('display','none');
    });

    $('.next, .vid2').click(function(){
        $('.vid2').css('display','none');
        $('.vid1').css('display','none');
        $('.vid3').css('display','block');
    });

     
    $('.prev, vid3').click(function(){
        $('.vid2').css('display','none');
        $('.vid1').css('display','block');
        $('.vid3').css('display','none');
    });
    
  
    $(window).on('scroll load',function(){
        if($(window).scrollTop() > 10){
            $('#header').addClass('header-active');
        }else{
            $('#header').removeClass('header-active');
        }
    });

});

// Responsive js

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}