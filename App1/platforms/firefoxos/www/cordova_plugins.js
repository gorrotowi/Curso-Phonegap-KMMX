cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-battery-status/www/battery.js",
        "id": "cordova-plugin-battery-status.battery",
        "clobbers": [
            "navigator.battery"
        ]
    },
    {
        "file": "plugins/cordova-plugin-battery-status/src/firefoxos/BatteryProxy.js",
        "id": "cordova-plugin-battery-status.Battery",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-battery-status": "1.0.0"
}
// BOTTOM OF METADATA
});