jQuery("document").ready(function($){
	$(".scroll").click(function(event){
		event.preventDefault();
		$('html,body').animate({
			scrollTop: ($(this.hash).offset().top - 60)
		},800);
	});
});

function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

$('.ft_person').height($('.ft_person').width());

$('#s_in').on('mouseover',function(){
  $('#img_in').attr('src','imgs/sets/in_off.png');
});
$('#s_in').on('mouseout',function(){
  $('#img_in').attr('src','imgs/sets/in_on.png');
});

$('#s_fb').on('mouseover',function(){
  $('#img_fb').attr('src','imgs/sets/fb_off.png');
});
$('#s_fb').on('mouseout',function(){
  $('#img_fb').attr('src','imgs/sets/fb_on.png');
});


$('#f_in').on('mouseover',function(){
  $('#f_img_in').attr('src','imgs/sets/in_off.png');
});
$('#f_in').on('mouseout',function(){
  $('#f_img_in').attr('src','imgs/sets/in_on.png');
});

$('#f_fb').on('mouseover',function(){
  $('#f_img_fb').attr('src','imgs/sets/fb_off.png');
});
$('#f_fb').on('mouseout',function(){
  $('#f_img_fb').attr('src','imgs/sets/fb_on.png');
});

$('#f_tt').on('mouseover',function(){
  $('#f_img_tt').attr('src','imgs/sets/tt_off.png');
});
$('#f_tt').on('mouseout',function(){
  $('#f_img_tt').attr('src','imgs/sets/tt_on.png');
});

$('#social').css('margin-left','calc(50% - '+($('#social').width() / 2)+'px)');

$('#popup').css('top','calc(40% - '+($('#popup').height() / 2)+'px)');

var p = readCookie('popup');
var i;
var e=true;
if ( p == "" ){
  i=true;
} else {
  i=false;
}

function PopUp(){
  if ( i ){
    $('#fundo').css('display','block');
    $('#popup').css('display','block');
    $('body').css('overflow','hidden');
    setTimeout(function(){
      $('#fundo').css('opacity','0.5');
      $('#popup').css('transform','scale(1)');
    },100);
    i=false;
    writeCookie('popup', 'ok', 1);
  } else {
    $('#fundo').css('opacity','0');
    $('#popup').css('transform','scale(0)');
    $('body').css('overflow','auto');
    setTimeout(function(){
      $('#fundo').css('display','none');
      $('#popup').css('display','none');
    },500);
    Bottom();
  }
}

function Bottom(){
  if ( e ){
    $('#bottom').css('display','block');
    setTimeout(function(){
      $('#bottom').css('bottom','0%');
    },100);
    e=false;
  } else {
    $('#bottom').css('bottom','-15%');
    setTimeout(function(){
      $('#bottom').css('display','none');
    },500);
  }
}

$('#cancel_popup').on('click',PopUp);
$('#fundo').on('click',PopUp);
$('.button_store').on('click',function(){i=true;e=true;PopUp();});
$('#cancel_bottom').on('click',Bottom);

$('#submit_popup').on('click',sendMailPopUp);
$('#submit_bottom').on('click',sendMailBottom);
$('#submit_form').on('click',sendMailForm);

function sendMailPopUp() {
  $('#erro_nome_popup').html("");
  $('#erro_email_popup').html("");
  var nome = $('#nome_popup').val();
  var email = $('#email_popup').val();
  var erro = 0;

  if ( nome == "" ){
    erro++;
    $('#erro_nome_popup').html("* Digite o seu nome.");
  }

  if ( email == "" ){
    erro++;
    $('#erro_email_popup').html("* Digite o seu e-mail.");
  }

  if ( erro == 0 ){
    $.ajax({
      type: "POST",
      url: "http://usevou.com/new/sendemail.php",
      data: {
          'q': 'popup',
          'nome': nome,
          'email': email
      },
      async: true,
      dataType: "json",
      success: function (json) {
        console.log(json);
        if (json[0]['res'] == 1){
          swal({
            title:'Obrigado!',
            text:'Agradecemos por se cadastrar!<br><br>Agora fique de olho no seu e-mail, em breve lhe enviaremos novidades! ;) <br><br>Acompanhe-nos também no Facebook: <a href=\"http://www.facebook.com/usevou\" style=\"color:inherit\" target=\"_blank\">www.facebook.com/usevou</a>.',
            type: 'success',
            html: true
          },function(){
            i=false;
            e=false;
            PopUp();
          });
        } else {
          $('#erro_email_popup').html(json[0]['erro']);
        }
      },error: function(xhr,e,t){
        console.log(xhr.responseText);
      }
    });
  }
}

function sendMailForm() {
  $('#erro_nome_form').html("");
  $('#erro_email_form').html("");
  $('#erro_assunto_form').html("");
  $('#erro_msg_form').html("");
  var nome = $('#nome_form').val();
  var email = $('#email_form').val();
  var assunto = $('#assunto_form').val();
  var msg = $('#msg_form').val();
  var erro = 0;

  if ( nome == "" ){
    erro++;
    $('#erro_nome_form').html("* Digite o seu nome.");
  }

  if ( email == "" ){
    erro++;
    $('#erro_email_form').html("* Digite o seu e-mail.");
  }

  if ( assunto == "" ){
    erro++;
    $('#erro_assunto_form').html("* Digite o assunto.");
  }

  if ( msg == "" ){
    erro++;
    $('#erro_msg_form').html("* Digite a mensagem.");
  }

  if ( erro == 0 ){
    $.ajax({
      type: "POST",
      url: "http://usevou.com/new/sendemail.php",
      data: {
          'q': 'form',
          'nome': nome,
          'email': email,
          'assunto': assunto,
          'msg': msg
      },
      async: true,
      dataType: "json",
      success: function (json) {
        console.log(json);
        if (json[0]['res'] == 1){
          swal({
            title:'Obrigado!',
            text:'Agradecemos pelo seu contato!<br><br>Agora fique de olho no seu e-mail, em breve lhe retornaremos!',
            type: 'success',
            html: true
          },function(){
            $('#nome_form').val('');
            $('#nome_form').css('background','white');
            $('#email_form').val('');
            $('#email_form').css('background','white');
            $('#assunto_form').val('');
            $('#assunto_form').css('background','white');
            $('#msg_form').val('');
            $('#msg_form').css('background','white');
          });
        } else {
          $('#erro_email_form').html(json[0]['erro']);
        }
      },error: function(xhr,e,t){
        console.log(xhr.responseText);
      }
    });
  }
}

function sendMailBottom() {
  $('#erro_nome_bottom').html("");
  $('#erro_email_bottom').html("");
  var nome = $('#nome_bottom').val();
  var email = $('#email_bottom').val();
  var erro = 0;

  if ( nome == "" ){
    erro++;
    $('#erro_nome_bottom').html("* Digite o seu nome.");
  }

  if ( email == "" ){
    erro++;
    $('#erro_email_bottom').html("* Digite o seu e-mail.");
  }

  if ( erro == 0 ){
    $.ajax({
      type: "POST",
      url: "http://usevou.com/new/sendemail.php",
      data: {
          'q': 'popup',
          'nome': nome,
          'email': email
      },
      async: true,
      dataType: "json",
      success: function (json) {
        console.log(json);
        if (json[0]['res'] == 1){
          swal({
            title:'Obrigado!',
            text:'Agradecemos por se cadastrar!<br><br>Agora fique de olho no seu e-mail, em breve lhe enviaremos novidades! ;) <br><br>Acompanhe-nos também no Facebook: <a href=\"http://www.facebook.com/usevou\" style=\"color:inherit\" target=\"_blank\">www.facebook.com/usevou</a>.',
            type: 'success',
            html: true
          },function(){
            i=false;
            e=false;
            PopUp();
          });
        } else {
          $('#erro_email_bottom').html(json[0]['erro']);
        }
      },error: function(xhr,e,t){
        console.log(xhr.responseText);
      }
    });
  }
}

PopUp();
