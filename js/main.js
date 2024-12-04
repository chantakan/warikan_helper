$('tbody').sortable();

$('#addRow').click(function(){
  let html = '<tr><td><input type="text" name="name" maxlength="15"></td><td><button class="remove">×</button></td></tr>';
  $('tbody').append(html);
});

$(document).on('click', '.remove', function() {
  if ($(this).parent().parent().parent().children().length > 1) {
   $(this).parents('tr').remove(); 
  }
});

function CheckEmpty(element){
  return element !== undefined && element !== null && element !== '';
}

$('#getValues').click(function(){
  let valuebox = [];
  $('input[name="name"]').each(function(i, elem){
      valuebox.push($(elem).val());
  });
  let clearvaluebox = new Set(valuebox);
  values = Array.from(clearvaluebox).filter(CheckEmpty);
  location.href = './input.html?name=' +  values.join(',');
});
