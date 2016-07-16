/**
 * Initial Canvas
 * @type {fabric}
 */
var canvas = new fabric.Canvas("canvas");
canvas.backgroundColor = '#eee';
canvas.renderAll();

/**
 * Change canvas background
 */
$('#bg_color').on('input', function() { 
	canvas.backgroundColor = $('#bg_color').val();
	canvas.renderAll();
});

/**
 * Add new text object
 */
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

/**
 * FabricJs Event
 * For more information about FabricJs event : https://github.com/kangax/fabric.js/wiki/Working-with-events
 */

/**
 * on Object:selected event
 */
canvas.on('object:selected', function(e) {
  onObjectSelected(e);
});

/**
 * on Object:selection_cleared event
 */
canvas.on('selection:cleared', function(e) {
  onSelectionCleared();
});

/**
 * On Object:moving event
 */
canvas.on('object:moving', function(e) {
  onObjectMoving(e);
});

/**
 * FabricJs method event
 */

/**
 * Change font type/font family
 * @param  {[object]} e [canvas object]
 * @return {[method]}   [render canvas]
 */
function changeFontType(e){
  return function(){
    e.fontFamily = $('#font_type').val();
    canvas.renderAll();
  }
}

/**
 * Change font color
 * @param  {[object]} e [canvas object]
 * @return {[method]}   [render canvas]
 */
function changeFontColor(e){
  return function(){
    e.fill = $('#font_color').val();
    canvas.renderAll();
  }
}

/**
 * Change text align
 * @param  {[object]} e [canvas object]
 * @return {[method]}   [render canvas]
 */
function changeTextAlign(e){
  return function(){
    e.textAlign = $('#text_align').val();
    canvas.renderAll();
  }
}

/**
 * Method event when object selected
 * @param  {[object]} e [canvas object]
 */
function onObjectSelected(e){
  $('#font_type').off('change');
  $('#font_color').off('change');
  $('#text_align').off('change');
  $('#delete_btn').off('click');
  $('#customBox').remove();
  showBox(e.target);
}

/**
 * Method event when object moving
 * @param  {[object]} e [canvas object]
 */
function onObjectMoving(e){
  setTimeout(function() {
    $('#customBox').remove();
    showBox(e.target);
  }, 500);
}

/**
 * Method event when object selection cleared
 * @param  {[object]} e [canvas object]
 */
function onSelectionCleared(){
  $('#customBox').remove();
}

/**
 * Method event when click on delete button
 * @return {[method]}   [render canvas]
 */
function removeLayers(){
  return function(){
    canvas.getActiveObject().remove();
    canvas.renderAll();
  }
}

/**
 * Method event when change font weight
 * @param  {[object]} e [canvas object]
 * @return {[method]}   [render canvas]
 */
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

/**
 * Method event when change font style
 * @param  {[object]} e [canvas object]
 * @return {[method]}   [render canvas]
 */
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

/**
 * Method event when change text decoration
 * @param  {[object]} e [canvas object]
 * @return {[method]}   [render canvas]
 */
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

/**
 * Show custom box
 * @param  {[object]} e [canvas object]
 */
function showBox (e) {
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
    moveBox(e);
  });
}

/**
 * Set size and position for custom box when object text draged
 * @param  {[object]} e [canvas object]
 */
function moveBox (e) {
  var w = $('#customBox').width();
  var h = $('#customBox').height();
  var coords = getObjPosition(e);
  var top = coords.bottom;
  var left = coords.left;
  $('#customBox').show();
  $('#customBox').css({top: top, left: left});
}

/**
 * Calculate and get object position based on canvas size
 * @param  {[object]} e [canvas object]
 * @return {[method]}   [render canvas]
 */
function getObjPosition (e) {
  var rect = e.getBoundingRect();
  var offset = canvas.calcOffset();
  var bottom = offset._offset.top + rect.top + rect.height;
  var right = offset._offset.left + rect.left + rect.width;
  var left = offset._offset.left + rect.left;
  var top = offset._offset.top + rect.top;
  return {left: left, top: top, right: right, bottom: bottom};
}
