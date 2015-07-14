var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
//        alert("asdfasdf")
        console.log('Received Event: ' + id);
        
        var btn = document.getElementById('capturar');
        
        btn.addEventListener('click', function(){
//            alert("btns")
            getImgData();
        });
        
        var getImgData = function(){
            var onSucces = function(info){
                var imagen = document.getElementById('image');
//                imagen.src = "data:image/jpeg;base64," +info;
                imagen.src = info;
//                window.plugins.socialsharing.share(null, null, "data:image/jpeg;base64," +info;)
            } 
            
            var onFail = function(error){
                alert(error.message)
            }
            
            navigator.camera.getPicture(onSucces, onFail, {quality:50, destinationType: Camera.DestinationType.FILE_URI})
        }
        
        document.getElementById('share').addEventListener('click', function(){
//            window.plugins.socialsharing.share("asdfasdf");
            window.plugins.socialsharing.share(null, "imagen", document.getElementById('image').src, null);
        })
        
    }
};

app.initialize();