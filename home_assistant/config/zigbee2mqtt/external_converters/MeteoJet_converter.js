const {battery, illuminance, temperature, humidity, pressure, windSpeed, binary, numeric} = require('zigbee-herdsman-converters/lib/modernExtend');

const definition = {
    zigbeeModel: ['MeteoJet'],
    model: 'MeteoJet',
    vendor: 'ARTEX',
    description: 'Weather station',
    icon: 'device_icons/meteojet.png',
    extend: [

        // Low Power Mode control
        binary({
            name: 'low_power_mode',
            valueOn: ['ON', 1, true],
            valueOff: ['OFF', 0, false],
            cluster: 0xFCBB,
            attribute: {ID: 0, type: 0x10},
            description: 'Low power mode',
            access: 'STATE_SET',
        }),
        battery(), 
        illuminance(), 
        temperature(), 
        humidity(), 
        pressure(), 
        windSpeed({unit:"km/h",}),
        numeric({
             name: "wind_gust",
             cluster: 0xFCBC,
             attribute: {ID: 0, type: 0x21},
             description: "Wind gust speed",
             unit: "km/h",
             scale: 100,
             access: "STATE_GET",
        }),
        numeric({
            name: 'wind_calibration',
            cluster: 0xFCBB,
            attribute: {ID: 1, type: 0x21},
            description: 'Wind calibration factor',
            scale: 100,
            valueStep: 0.01,
            valueMin: 0.01,
            valueMax: 1.99,
            access: 'STATE_SET',
        }),
        binary({
            name: 'rain_drop',
            valueOn: ['ON', 1, true],
            valueOff: ['OFF', 0, false],
            cluster: 0xFCBA,
            attribute: {ID: 0, type: 0x10},
            description: 'Rain sensor is wet (rain detected)',
            access: 'STATE_GET'
        }),
        numeric({
            name: 'rain_threshold',
            cluster: 0xFCBB,
            attribute: {ID: 3, type: 0x20}, //U8
            description: 'Rain drop threshold for rain detection',
            valueStep: 1,
            valueMin: 1,
            valueMax: 100,
            access: 'STATE_SET',
        }),
        numeric({
            name: 'rain_intensity',
            cluster: 0xFCBA,
            attribute: {ID: 1, type: 0x21},
            description: 'Current rain intensity',
            unit: 'mm/h',
            scale: 100,
            access: 'STATE_GET'
        }),
        numeric({
            name: 'rain_1h',
            cluster: 0xFCBA,
            attribute: {ID: 2, type: 0x21},
            description: 'Rainfall in the last hour',
            unit: 'mm',
            scale: 100,
            access: 'STATE_GET'
        }),
        numeric({
            name: 'rain_24h',
            cluster: 0xFCBA,
            attribute: {ID: 3, type: 0x21},
            description: 'Rainfall in the last 24 hours',
            unit: 'mm',
            scale: 100,
            access: 'STATE_GET'
        }),
        numeric({
            name: 'rain_48h',
            cluster: 0xFCBA,
            attribute: {ID: 4, type: 0x21},
            description: 'Rainfall in the last 48 hours',
            unit: 'mm',
            scale: 100,
            access: 'STATE_GET'
        }),
        numeric({
            name: 'rain_3d',
            cluster: 0xFCBA,
            attribute: {ID: 5, type: 0x21},
            description: 'Rainfall in the last 3 days',
            unit: 'mm',
            scale: 100,
            access: 'STATE_GET'
        }),
        numeric({
            name: 'rain_7d',
            cluster: 0xFCBA,
            attribute: {ID: 6, type: 0x21},
            description: 'Rainfall in the last 7 days',
            unit: 'mm',
            scale: 100,
            access: 'STATE_GET'
        }),
        numeric({
            name: 'rain_calibration',
            cluster: 0xFCBB,
            attribute: {ID: 2, type: 0x21},
            description: 'Rain calibration factor',
            scale: 100,
            valueStep: 0.01,
            valueMin: 0.01,
            valueMax: 1.99,
            access: 'STATE_SET',
        }),
        // Debug log: two fixed-size attributes reporting log events from the device.
        //    code  = event type (see LOG_CODE_* defines in zigbee.h)
        //    value = optional numeric value associated with the event
        numeric({
            name: 'debug_log_code',
            cluster: 0xFCBD,
            attribute: {ID: 0, type: 0x20},  // U8
            description: 'Debug log event code',
            access: 'STATE',
        }),
        numeric({
            name: 'debug_log_value',
            cluster: 0xFCBD,
            attribute: {ID: 1, type: 0x23},  // U32
            description: 'Numeric value associated with the last debug log event',
            access: 'STATE',
        }),
    ]
};

module.exports = definition;