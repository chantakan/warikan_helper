// メンバー

function CheckEmpty(element){
  return element !== undefined && element !== null && element !== '';
}

let query = location.search;
let valuebox = query.split('=')[1].split(',');
let clearvaluebox = new Set(valuebox);
let  values = Array.from(clearvaluebox).filter(CheckEmpty);

if (values.length < 2) {
  $('body').html('<h1>メンバーが足ないよ</h1>');
};

$.each(values, function(index, value) {
  $('#members').append("<li id='member_" + index + "'>" + decodeURIComponent(value) + "</li>");
});


// 割り勘

function leaveOnlyNumber(e){
  // 数字以外の不要な文字を削除
  let st = String.fromCharCode(e.which);
  if ("0123456789".indexOf(st,0) < 0) { return false; }
  return true;  
}

$('#addSp').click(function(){
  let html = '<tr><td><input class="material" type="text" name="material" maxlength="15" placeholder="項目"></td><td>¥<input class="price" type="tel" name="price" maxlength="9" placeholder="金額"></td><td><select class="greeter" name="greeter" required onchange="changeColor(this)"><option value="" hidden class="spliter">立替人</option></select></td><td><button class="remove">×</button></td></tr>';
  $('#split table tbody').append(html);
  $.each(values, function(index, value) {
  $('.greeter').append("<option style="+"color:gray"+">" + decodeURIComponent(value) + "</option>");
  });
  $('.price').on("keypress", function(event){return leaveOnlyNumber(event);});
  $('.price').on("keyup", function(){return this.value = this.value.replace(/^0+/,'');});
});

$('.price').on("keypress", function(event){return leaveOnlyNumber(event);});
$('.price').on("keyup", function(){return this.value = this.value.replace(/^0+/,'');});

$(document).on('click', '.remove', function() {
  if ($(this).parent().parent().parent().children().length > 1) {
   $(this).parents('tr').remove(); 
  }
});

$.each(values, function(index, value) {
  $('.greeter').append("<option style="+"color:gray"+">" + decodeURIComponent(value) + "</option>");
});

function changeColor(hoge){
  if(hoge.value == 0){
    hoge.style.color = '';
  }else{
    hoge.style.color = 'snow';
  }
}

// 奢り
$('#addTr').click(function(){
  let html = '<tr><td><input class="material" type="text" name="material" maxlength="15" placeholder="項目"></td><td>¥<input class="price" type="tel" name="price" maxlength="9" placeholder="金額"></td><td><select class="payer" name="payer" label="おごった人" required onchange="changeColor(this)"><option value="" hidden>奢り</option></select></td><td><select class="payee" name="payee" label="おごられた人" required onchange="changeColor(this)"><option value="" hidden>奢られ</option></select></td><td><button class="remove">×</button></td>(/tr';
  $('#treat table tbody').append(html);
  $.each(values, function(index, value) {
  $('.payer').append("<option style="+"color:gray"+">" + decodeURIComponent(value) + "</option>");
  $('.payee').append("<option style="+"color:gray"+">" + decodeURIComponent(value) + "</option>");
  });
  $('.price').on("keypress", function(event){return leaveOnlyNumber(event);});
  $('.price').on("keyup", function(){return this.value = this.value.replace(/^0+/,'');});
});

$.each(values, function(index, value) {
  $('.payer').append("<option style="+"color:gray"+">" + decodeURIComponent(value) + "</option>");
  $('.payee').append("<option style="+"color:gray"+">" + decodeURIComponent(value) + "</option>");
});

// 清算

let warikan = () => {
  let data = [];
  $('#split table tbody tr').each(function(i) {
    data[i] = [];
    data[i][0] = $('.material', $(this)).val();
    data[i][1] = $('.price', $(this)).val();
    data[i][2] = $('.greeter', $(this)).val();
  });
  for (let i = data.length -1; i >= 0; i--) {
    if(data[i].indexOf('') > -1){
      data.splice(i,1);
    }
  }
  for (let i = data.length -1; i >= 0; i--) {
    if(data[i].indexOf('建替人') > -1){
      data.splice(i,1);
    }
  } 
  return data;
};

let ogori = () => {
  let data = [];
  $('#treat table tbody tr').each(function(i) {
    data[i] = [];
    data[i][0] = $('.material', $(this)).val();
    data[i][1] = $('.price', $(this)).val();
    data[i][2] = $('.payer', $(this)).val();
    data[i][3] = $('.payee', $(this)).val();
  });
  for (let i = data.length -1; i >= 0; i--) {
    if(data[i].indexOf('') > -1){
      data.splice(i,1);
    }
  }
  for (let i = data.length -1; i >= 0; i--) {
    if(data[i].indexOf('奢り') > -1){
      data.splice(i,1);
    }
  }
  for (let i = data.length -1; i >= 0; i--) {
    if(data[i].indexOf('奢られ') > -1){
      data.splice(i,1);
    }
  } 
  return data;
};

let seisan = () => {
  let seisan = [];
  for(let i = 0; i < values.length; i++){
    seisan[i] = 0;
    for(let j = 0; j < warikan().length; j++){
      if (decodeURIComponent(values[i]) === warikan()[j][2]) {
        seisan[i] = seisan[i] + (values.length -1) * Number(warikan()[j][1])/ (values.length);
      }else{
        seisan[i] = seisan[i] - Number(warikan()[j][1])/ (values.length);
      }
    }
    for (let j = 0; j < ogori().length; j++) {
      if (decodeURIComponent(values[i]) === ogori()[j][2]){
        seisan[i] = seisan[i] + Number(ogori()[j][1]);
      }
      if (decodeURIComponent(values[i]) === ogori()[j][3]){
        seisan[i] = seisan[i] - Number(ogori()[j][1]);
      }
    }
  }
  return seisan;
}


$('#calculate').click(function(){
  $('#result').html('<table></table>')
  $.each(values, function(index, value) {
    $('#result table').append("<tr><th>" + decodeURIComponent(value) + "</th><td>" + Math.floor(seisan()[index]).toString() + "円</td></tr>");
  });
  $('#result').append('<p>小数点以下を四捨五入しています.</p>')
});