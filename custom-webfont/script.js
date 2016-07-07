    var canvas = new fabric.Canvas("canvas");
    canvas.backgroundColor = '#ddd';
    canvas.renderAll();
    
    function addText(){
      return function(){
        var style1 = new fabric.Text("Webfont : Righteous", { 
            fontFamily: "Righteous", 
            left: 50,
            top: 30,
            fontSize: 20,
            fill: '#000',
        });
        canvas.add(style1);
        var style2 = new fabric.Text("Webfont : Courgette", { 
            fontFamily: "Courgette", 
            left: 50,
            top: 130,
            fontSize: 20,
            fill: '#000',
        });
        canvas.add(style2);
        var style3 = new fabric.Text("Webfont : Aldrich", { 
            fontFamily: "Aldrich", 
            left: 50,
            top: 230,
            fontSize: 20,
            fill: '#000',
        });
        canvas.add(style3);
        canvas.renderAll();
        $("#loading").fadeOut();
      }
    }
    
    WebFont.load({
      google : {
          families : [
              'Righteous',
              'Courgette',
              'Aldrich'
         ]
      },
      active : addText(),
      loading : function(){
          $("#loading").show();
      }
    });
