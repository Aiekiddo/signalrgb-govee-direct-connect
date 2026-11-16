# Govee Direct Connect

[![Click here to add this repo to SignalRGB](https://raw.githubusercontent.com/SRGBmods/QMK-Images/main/images/add-to-signalrgb.png)](https://srgbmods.net/s?p=addon/install?url=https://github.com/Aiekiddo/signalrgb-govee-direct-connect)

## Getting started
This SignalRGB Addon allows you to add Govee devices via a direct IP connection. You control the amount of leds of the device and what protocol is used to communicate with the device. You can even use components to build your exact Govee Glide setup.

You should make sure your device is connected to your wifi via the app, you have refreshed the light segments and have turned on LAN Control. It works best if the device has an assigned IP by reserving an IP in your router.

If your device consists of multiple components like the Govee Bars, you can select 'Duplicate'. The amount of LEDS you enter should then be the amount of 1 bar. For example: The H6046 has two bars and each bar has 10 LEDs. You would then set the LED count to 10 and select 'Duplicate'. Your layout will now have one device representing both of the bars.
If you'd rather split the leds evenly over two devices, then fill in the total amount of LEDs and select 'Two devices'. Your layout will now show two devices representing each of the bars.

If you have a more complex device like the Glide (H6062), you can select 'Custom components'. This way you can make your layout exactly like you have your device on the wall. Make sure for the H6062 that you count 9 LEDs for the each straight bar and 3 LEDs for each corner. If you'd like to use the actual components for this device, they are included in this repository.

## Known Issues
- Getting the information from the device sometimes takes a while, give the bars around 30 seconds to start
- Sometimes the bars don't turn off when you shut down SignalRGB

## Installation
Click the **Add to SignalRGB** button above and accept the prompt. Restart SignalRGB
after installation, open the **Network** devices page, and use **Govee Direct
Connect** to add a light by its reserved IPv4 address. The extension and its
settings page are installed together; installing only `GoveeDirectConnect.js`
as a USB plugin will not install this network addon.

In the Govee app, connect the light to Wi-Fi, refresh its light segments, and
enable **LAN Control** before adding it. Keep the device IP reserved in your
router so the saved configuration continues to point to the same light.

The add and update controls validate complete IPv4 addresses and supported
settings. If a saved cache entry is invalid, the addon skips that entry and
continues loading the rest of the configured devices. Changing an IP updates
the discovery entry immediately; an IP already assigned to another configured
light cannot be used.

## Support
Feel free to open issues here, or join the SignalRGB Testing Server and post an issue there https://discord.com/invite/J5dwtcNhqC. Don't forget to tag me @rickofficial
