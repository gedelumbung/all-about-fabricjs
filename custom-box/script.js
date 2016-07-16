var canvas = new fabric.Canvas("canvas");
canvas.backgroundColor = '#eee';
canvas.renderAll();
$('#bg_color').on('input', function() { 
	canvas.backgroundColor = $('#bg_color').val();
	canvas.renderAll();
});
$('#btn_add_new').click(function(e) {
  e.preventDefault();
  if($('#new_text').val() !== '')
  {
    var newText = new fabric.IText($('#new_text').val(), { 
      fontFamily: "Arial", 
      left: 10,
      top: 10,
      fontSize: 20,
      textAlign: "left",
      fill: 'black',
    });
    canvas.add(newText);
    canvas.renderAll();
    $('#new_text').val('');
  }
});

function changeFontType(e){
  return function(){
    e.fontFamily = $('#font_type').val();
    canvas.renderAll();
  }
}

function changeFontColor(e){
  return function(){
    e.fill = $('#font_color').val();
    canvas.renderAll();
  }
}

function changeTextAlign(e){
  return function(){
    e.textAlign = $('#text_align').val();
    canvas.renderAll();
  }
}

canvas.on('object:selected', function(e) {
  onObjectSelected(e, canvas);
});

canvas.on('selection:cleared', function(e) {
  onSelectionCleared();
});

canvas.on('object:moving', function(e) {
  onObjectMoving(e, canvas);
});

function onObjectSelected(e, canvas){
  $('#font_type').off('change');
  $('#font_color').off('change');
  $('#text_align').off('change');
  $('#delete_btn').off('click');
  $('#customBox').remove();
  showImageTools(e.target, canvas);
}

function onObjectMoving(e, canvas){
  setTimeout(function() {
    $('#customBox').remove();
    showImageTools(e.target, canvas);
  }, 500);
}

function onSelectionCleared(){
  $('#customBox').remove();
}

function removeLayers(){
  return function(){
    canvas.getActiveObject().remove();
    canvas.renderAll();
  }
}

function changeFontWeight(e){
  return function(){
    $('#text_bold').val($(this).is(':checked'));
    if($(this).is(":checked")) {
        e.fontWeight = 'bold';
        canvas.renderAll();
    }
    else{
        e.fontWeight = 'normal';
        canvas.renderAll();
    }
  }
}

function changeFontStyle(e){
  return function(){
    $('#text_italic').val($(this).is(':checked'));
    if($(this).is(":checked")) {
        e.fontStyle = 'italic';
        canvas.renderAll();
    }
    else{
        e.fontStyle = 'normal';
        canvas.renderAll();
    }
  }
}

function changeTextDecoration(e){
  return function(){
    $('#text_underline').val($(this).is(':checked'));
    if($(this).is(":checked")) {
        e.textDecoration = 'underline';
        canvas.renderAll();
    }
    else{
        e.textDecoration = 'normal';
        canvas.renderAll();
    }
  }
}

function showImageTools (e, side) {
  var url = 'box.htm';
  $.get(url, function(data) { 
    if (!$('#customBox').length) {
      $('body').append("<div id='customBox' style='position: absolute; top: 10; left: -50'><h3>"+data+"</h3></div>");
      $('#font_type').change(changeFontType(e));
      $('#font_color').change(changeFontColor(e));
      $('#text_align').change(changeTextAlign(e));
      $('#delete_btn').click(removeLayers());
      $('#font_type').val(e.fontFamily);
      $('#font_color').val(e.fill);
      $('#text_align').val(e.textAlign);

      $('#text_bold').prop('checked', function(){
          if(e.fontWeight === 'bold'){
              return true;
          }
          else{
              return false;
          }
      });

      $('#text_italic').prop('checked', function(){
          if(e.fontStyle === 'italic'){
              return true;
          }
          else{
              return false;
          }
      });

      $('#text_underline').prop('checked', function(){
          if(e.textDecoration === 'underline'){
              return true;
          }
          else{
              return false;
          }
      });

      $('#text_bold').change(changeFontWeight(e));
      $('#text_italic').change(changeFontStyle(e));
      $('#text_underline').change(changeTextDecoration(e));
    }
    moveImageTools(e, side);
  });
}

function moveImageTools (e, side) {
  var w = $('#customBox').width();
  var h = $('#customBox').height();
  var coords = getObjPosition(e, side);
  var top = coords.bottom;
  var left = coords.left;
  $('#customBox').show();
  $('#customBox').css({top: top, left: left});
}

function getObjPosition (e, side) {
  var rect = e.getBoundingRect();
  var offset = side.calcOffset();
  var bottom = offset._offset.top + rect.top + rect.height;
  var right = offset._offset.left + rect.left + rect.width;
  var left = offset._offset.left + rect.left;
  var top = offset._offset.top + rect.top;
  return {left: left, top: top, right: right, bottom: bottom};
}
