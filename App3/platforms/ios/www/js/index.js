/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
         var positionOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
        
        document.getElementById('dataPosition').innerHTML = "<h3>calculando</h3>";
        var onSucces = function(info){
            var data = "latitud: "+ info.coords.latitude+ "\n"+
                "altitud: "+ info.coords.altitude+ "\n"+
                "longitud: "+ info.coords.longitude+ "\n";
            document.getElementById('dataPosition').innerHTML = data;
        }
        
        function onError(error){
            alert("Failed: "+error.code + " "+error.message)
        }
        
        navigator.geolocation.getCurrentPosition(onSucces, onError, positionOptions);
        
    }
};

app.initialize();