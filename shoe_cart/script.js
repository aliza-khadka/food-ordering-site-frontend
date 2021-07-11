$('.cart_list').click(function(){
  return false;
});
$('.close_btn, .cancel, .cart_bottom').click(function(){
  $('.cart_bottom').css({'display': 'none'});
  $('.white_bottom').removeClass('blur');
}); 
$('#cartIcon').click(function(){
  $('.cart_bottom').css({'display': 'flex'});
  $('.white_bottom').addClass('blur');
});

//----------add qty-----------
var qty = 1;
function AddandSub(obj, n){
  $(obj).click(function(){
    if(n==-1){
      ( qty <= 1 ) ? qty==1 : qty += n;
    }else{
      qty += n;  
    }
    $('.num').text(qty);
    $('.count').text(qty);
  });
}
AddandSub('.add', 1)
AddandSub('.sub', -1)


//---------------select--------------------
function Select_AddClass(group, text_obj, classN){
  for(i=0 ; i<$(group).length ; i++){
    $(group).eq(i).click(function(){
      $(group).removeClass(classN);
      var text;
      text = $(this).text();
      $(text_obj).text(text);
      $(this).addClass(classN);
      $('.RTnumber').removeClass('countScale');
    });
  }
  

}
//---------------selectColor--------------------
Select_AddClass('.color_group div', '.this_color', 'th')
//---------------selectSize--------------------
Select_AddClass('.size ul li', '.size_num', 'th_size')


//
var d = new Date();
var dd = d.getDate();
var mm = d.getMonth() + 1;
var yy = d.getFullYear();

var buyListJson = {
  name: "myCart",
  item: [
    {
      "src": "shoeR.png?dl=0", 
      "i_name": "Roshe Walk",
      "i_date": "2016-11-23",
      "i_color": "Maroon",
      "i_size": "8",
      "i_QTY": "2",
      "i_price": "17400"
    },
    {
      "src": "shoeW.png?dl=0", 
      "i_name": "Roshe Walk",
      "i_date": "2016-11-22",
      "i_color": "Ivory",
      "i_size": "8.5",
      "i_QTY": "1",
      "i_price": "8700"
    }
  ]
}
var myshoelink='{"name": "myCart", "item": [{"src": "shoeR.png?dl=0", "i_name": "Roshe Walk "," i_date ":" 2016-11-23 "," i_color ":" Maroon "," i_size ":" 8 "," i_QTY ":" 2 "," i_price ":" 17400 "}, {" src ":" shoeW.png?dl=0 "," i_name ":" Roshe Walk "," i_date ":" 2016-11-22 "," i_color " : "Ivory", "i_size": "8.5", "i_QTY": "3", "i_price": "26100"}]}?dl=0'
$.ajax({
  url: myshoelink,
  success: function(data){
    //alert(); 
    console.log(JSON.parse(data));
    buyListJson = JSON.parse(data);
    
    createList();
  }
});

var total = 0;
var redsrc = "shoeR.png?dl=0";
var whitesrc = "shoeW.png?dl=0";
var cartlist = "<li> <div class='i_des'> <div class='pimg'><img src={{img}}/></div> <div class='i_name'>{{i_name}}</div> <div class='i_date'>{{i_date}}</div> </div> <div class='i_color'>{{i_color}}</div> <div class='i_size'>{{i_size}}</div> <div class='i_QTY'>{{i_QTY}}</div> <div class='i_price'>NT$ {{i_price}}</div> <div class='i_remove'> <svg viewbox='0 0 100 100'> <g> <rect x='22' y='22' width='56' height='9'></rect> <rect x='39' y='18' width='22' height='4'></rect> <path d='M26,35v48h48V35H26z M39,74h-4V39h4V74z M52,74h-4V39h4V74z M66,74h-5V39h5V74z'></path> </g> </svg> </div> </li>";
function createList(){
  total = 0;
  $('.list ul').html(''); //-----------clear OG list------------
  for(i=0 ; i<buyListJson.item.length ; i++){
    $('.list ul').append(cartlist.replace('{{img}',buyListJson.item[i].src)
                                   .replace('{{i_name}}',buyListJson.item[i].i_name)
                                   .replace('{{i_date}}',buyListJson.item[i].i_date)
                                   .replace('{{i_color}}',buyListJson.item[i].i_color)
                                   .replace('{{i_size}}',buyListJson.item[i].i_size)
                                   .replace('{{i_QTY}}',buyListJson.item[i].i_QTY)
                                   .replace('{{i_price}}',buyListJson.item[i].i_price)
                          );
    
    //-------------------add remove event-------------------------------
    $('.i_remove').eq(i).attr("deleteIndex", i); 
    
    $('.i_remove').eq(i).click(function(){
      $(this).parent().animate({'left': '-300','opacity': '0'}, 500);
      console.log($(this).attr("deleteIndex"));
      buyListJson.item.splice($(this).attr("deleteIndex"), 1);
      setTimeout(function(){
        createList();  
      }, 500); 
    });
    
    //-----------------------total price----------------------------------
    
    total += parseInt(buyListJson.item[i].i_price);
    //console.log(total)
    //console.log($('.totalP').text()) 
  }
  $('.totalP').text("NT$ " + total);
  //-----------------detect list amount------------------------
  if(buyListJson.item.length == 0){
    $('.RTnumber').css({'display': 'none'});  
  }else{
    $('.RTnumber').css({'display': 'block'});
    $('.RTnumber').text(buyListJson.item.length);  
  }
}
createList();
//-----------------------add to list----------------------------------------
$('#addTOCart').click(function(){
  //--------------detect none color & size-----------------------
  if(($('.this_color').text() == "") || ($('.size_num').text() == "")){
    alert("Please select the quantity, color and size.");
    return false; 
  }else{
    //alert()
  //---------------detect shoe color----------------------------
    var thissrc = ""; 
    if($('.this_color').text() == "Maroon"){
      thissrc = redsrc;
    }else{
      thissrc = whitesrc;
    }
  //-----------------------------------------
    buyListJson.item.unshift({
      src: thissrc, 
      i_name: $('.info .name').text(),
      i_date: yy + '-' + mm + '-' + dd,
      i_color: $('.this_color').text(),
      i_size: $('.size_num').text(),
      i_QTY: $('.num').text(),
      i_price: 8700 * parseInt($('.num').text())
    });
    $('.RTnumber').addClass('countScale');
    createList();
    
  }
  //-------------removeClass--------------------------
    $('.color_group div').removeClass('th');
    $('.this_color').text("");
    $('.size ul li').removeClass('th_size');
    $('.size_num').text("");
  //----------------set qty to 1-----------------------
  qty = 1;
  $('.count').text(qty);
  $('.num').text(qty);
  
  

});

$('.imgW').css({'left': '-410px'});  
$('.imgR').css({'left': '0px'});
//----------------------
function switch_click(obj, dis1, dis2 ,Img){
  $(obj).click(function(){
    $('.switch div').removeClass('th_shoe');
    $(this).addClass('th_shoe')
    $('.imgW').animate({'left': dis1}, 500);  
    $('.imgR').animate({'left': dis2}, 500);
    roomImg(Img);
  });  
}
switch_click('.switch2', '0px', '410px', '.imgW');
switch_click('.switch1', '-410px', '0px', '.imgR');

function trigger(obj, obj2){
  $(obj).click(function(){
    $(obj2).trigger("click")  
  });  
}
trigger('.right_btn', ".switch2");
trigger('.left_btn', ".switch1");
trigger('.c1', ".switch1");
trigger('.c2', ".switch2");


$( ".switch1" ).trigger( "click" );




//----------------image room--------------------


function roomImg(obj){
  $('.roomRec img').css({'width': parseInt($('.imgR').css('width'))*3 + 'px'});
  
  $('.shoe_img img, .roomRec').mousemove(function(ev){
    var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //console.log(scrollTop)
    
    $('.roomRec').css({"display": "block"});
    var oEvent = ev || event;
    var X = scrollLeft+oEvent.clientX;
    var Y = scrollTop+oEvent.clientY;
    var recH = parseInt($('.roomRec').css("height"));
    
    $('.roomRec img').attr("src", $(this).attr("src"));
    
    $('.roomRec').css({'left': X + 'px'});
    $('.roomRec').css({'top': Y - recH + 'px'});
    
    
    var imgL = Math.round( X - $(obj).offset().left);
    var imgT = Math.round( Y - $(obj).offset().top);
    
    

    $('.mouseP').val(imgL + " , " + imgT);
    $('.roomRec img').css({'left': ((-imgL) * 3 + 60)+ 'px'});
    $('.roomRec img').css({'top': ((-imgT) * 3 + 60)+ 'px'});

  });
  $('.shoe_img img').mouseleave(function(){
    $('.roomRec').css({'display': 'none'});
  });    
}