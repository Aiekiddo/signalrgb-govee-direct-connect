import udp from "@SignalRGB/udp";

export default class GoveeController
{
    constructor(goveeDevice)
    {
        this.device = goveeDevice;

        this.id = goveeDevice.ip;
        this.name = goveeDevice.getName();

        this.changed = false;
        this.statusData = {};

        this.connected = false;
        this.messageQueue = [];
    }

    validateDeviceUpdate(leds, type, split, ip)
    {
        let parsedLeds = parseInt(leds, 10);
        let parsedType = Number(type);
        let parsedSplit = Number(split);
        return (
            isValidIPv4(ip) &&
            Number.isInteger(parsedLeds) && parsedLeds >= 1 && parsedLeds <= 500 &&
            Number.isInteger(parsedType) && parsedType >= 1 && parsedType <= 5 &&
            Number.isInteger(parsedSplit) && parsedSplit >= 1 && parsedSplit <= 4 &&
            (parsedLeds != this.device.leds ||
            parsedType != this.device.type ||
            parsedSplit != this.device.split ||
            ip != this.device.ip)
        );
    }

    updateDevice(leds, type, split, ip)
    {
        // Change the device data
        this.device.leds = leds;
        this.device.type = type;
        this.device.split = split;

        // We have to do a little more if the IP has changed
        let ipChanged = (this.device.ip != ip);
        this.device.ip = ip;

        // Save the device data
        this.device.save();

        if (ipChanged)
        {
            // Change the device name
            this.device.name = this.device.generateName();
            
            // We should change the IP in discovery
            // this.discovery.changeIp(this.device.ip, ip);

            // Update the controller ID and name
            this.id = ip;
            this.name = this.device.getName();
        }

        // We should have the device disconnect the socket
        //service.log('Sending disconnect command to device port: ' + this.device.uniquePort);
        //this.sendToDevice({msg: { cmd: 'disconnect' }})

        // Let discovery know that we updated the device settings and need to reinit the device
        // this.discovery.updatedController(this);
    }

    toCacheJSON()
    {
        return this.device.toCacheJSON();
    }

    handleSocketError(errId, errMessage)
    {
        service.log(errMessage);
    }

    relaySocketMessage(value, discovery)
    {
        if (this.device.uniquePort)
        {
            // Let the device handle the received message
            this.device.handleSocketMessage(value);
            if (this.device.hasChanged)
            {
                this.device.save();
                this.device.hasChanged = false;

                // Save the new data to the cache
                discovery.saveCache();
            }

            let goveeResponse = JSON.parse(value.data);
            // Also send to device for realtime changes
            this.sendToDevice(goveeResponse);
        } else
        {
            service.log('Govee device doesnt have a unique port');
        }
    }

    sendToDevice(data)
    {
        this.setupUDPSocket();
        this.udpSocket.write(data, '127.0.0.1', this.device.uniquePort);
    }

    setupUDPSocket()
    {
        if (!this.udpSocket)
        {
            service.log('Creating udp socket for controller ' + this.id);
            this.udpSocket = udp.createSocket();
            this.udpSocket.on('error', this.handleSocketError.bind(this));
        }
    }
}

function isValidIPv4(ip)
{
    if (typeof ip !== 'string') return false;
    const parts = ip.split('.');
    return parts.length === 4 && parts.every(part =>
        /^(0|[1-9][0-9]{0,2})$/.test(part) && parseInt(part, 10) <= 255);
}
