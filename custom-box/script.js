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
        fill: '#333',
    });
    canvas.add(newText);
    canvas.renderAll();
    $('#new_text').val('');
  }
});

function changeFontType(e){
  return function(){
  console.log($('#font_type').val())
      e.fontFamily = $('#font_type').val();
      canvas.renderAll();
  }
}

canvas.on('object:selected', function(e) {
  onObjectSelected(e, canvas);
});

canvas.on('selection:cleared', function(e) {
  onSelectionCleared(canvas);
});

canvas.on('object:moving', function(e) {
  onObjectMoving(e, canvas);
});

function onObjectSelected(e, canvas){
  $('#font_type').off('change');
  $('#customBox').remove();
  showImageTools(e.target, canvas);
}

function onObjectMoving(e, canvas){
  setTimeout(function() {
      $('#customBox').remove();
      showImageTools(e.target, canvas);
  }, 500);
}

function onSelectionCleared(side){
  $('#customBox').remove();
}

function removeLayers(index){
  canvas.getObjects()[index].remove();
}

function showImageTools (e, side) {
    var url = 'box.htm';
    $.get(url, function(data) { 
        if (!$('#customBox').length) {
            $('body').append("<div id='customBox' style='position: absolute; top: 10; left: -50'><h3>"+data+"</h3></div>");
            $('#font_type').change(changeFontType(e));
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
