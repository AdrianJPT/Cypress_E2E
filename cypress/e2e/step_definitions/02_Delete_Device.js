import {Given,When,Then,} from "@badeball/cypress-cucumber-preprocessor";
import { netboxLogin } from "../POM/Netbox/NetboxLogin";
import { netboxDevice } from "../POM/Netbox/NetboxDevice";
import { netboxMain } from "../POM/Netbox/NetboxMain";
import { netboxDeviceConfig } from "../POM/Netbox/NetboxDeviceConfig";
import { netboxDeviceInfo } from "../POM/Netbox/NetboxDeviceInfo";
import { zabbixLogin } from "../POM/Zabbix/ZabbixLogin";
import { zabbixHost } from "../POM/Zabbix/ZabbixHost";

let ZabbixURL = "http://192.168.40.40:80/"
let NetboxURL = "http://192.168.40.40:8000/"

Given('Log in successfully in Netbox and Zabbix', ()=>{
    
    cy.visit( NetboxURL + "login/?next=/")
    netboxLogin.enterUsername('Admin')
    netboxLogin.enterPassword('Admin')
    netboxLogin.clickLoginButton()
    
    cy.visit( ZabbixURL + "index.php")
    zabbixLogin.enterUsername('Admin')
    zabbixLogin.enterPassword('zabbix')
    zabbixLogin.clickLoginButton()

})
// E-01
Given('There are any device in Devices in Netbox', ()=>{

    cy.visit( NetboxURL + "dcim/devices/")
    


    netboxDevice.selectAllNetboxDevices();
    netboxDevice.deleteAllNetboxDevices();
    netboxDevice.deleteConfirmationCONDITIONAL();
    
})

// E-02
Given('I have {string} devices in Netbox and Zabbix', (DeviceName)=>{

    cy.visit( NetboxURL + "dcim/devices/")
    netboxDevice.clickToADDbutton()

    netboxDeviceConfig.enterDeviceName(DeviceName)
    netboxDeviceConfig.selectDeviceRole("device_role")
    netboxDeviceConfig.selectDeviceType("Device Type")
    netboxDeviceConfig.selectSite("SITIO-01")
    netboxDeviceConfig.selectPlatform("Windows Server 2019")
    netboxDeviceConfig.clickCreateButton()

})
When('I delete the device {string}', (DeviceName)=>{
    
    cy.visit( NetboxURL + "dcim/devices/")

    netboxDevice.clickDevice(DeviceName)
    netboxDeviceInfo.clickDeleteButton()
    netboxDeviceInfo.clickDeleteConfirmationButton()

})
Then('{string} should not exist in Zabbix', (HostName)=>{
    cy.visit( ZabbixURL + "zabbix.php?action=host.list")

    zabbixHost.resetFilters()
    zabbixHost.enterHostnameFilter(HostName)
    zabbixHost.clickApplyButton()

    // Assertions
    //cy.get(zabbixHost.TABLE_HOST).should('have.text', 'No data found.')
    cy.get(zabbixHost.TABLE_HOST).contains("No data found").should('not.have.text', HostName)
})

// E-03
Given('I have {int} Devices in Netbox and Zabbix', (number_devices)=>{
    cy.visit( NetboxURL + "dcim/devices/")

    // Create first and main Device
    let clone = "Delete_Clone_"
    let tag_number = 1

    netboxDevice.clickToADDbutton()
    netboxDeviceConfig.enterDeviceName(clone + tag_number)
    netboxDeviceConfig.selectDeviceRole("device_role")
    netboxDeviceConfig.selectDeviceType("Device Type")
    netboxDeviceConfig.selectSite("SITIO-01")
    netboxDeviceConfig.selectPlatform("Windows Server 2019")
    netboxDeviceConfig.clickCreateButton()

    // Clones
    cy.visit( NetboxURL + "dcim/devices/")
    netboxDevice.clickDevice(clone + tag_number)

    
    for (tag_number = 2; tag_number <= number_devices; tag_number++){
        netboxDeviceInfo.clickCloneButton()
        netboxDeviceConfig.enterDeviceName(clone + tag_number)
        netboxDeviceConfig.selectDeviceRole("device_role")
        netboxDeviceConfig.selectDeviceType("Device Type")
        netboxDeviceConfig.selectSite("SITIO-01")
        netboxDeviceConfig.selectPlatform("Windows Server 2019")
        netboxDeviceConfig.clickCreateButton()
    }
    

})
When('I delete all the devices', ()=>{
    cy.visit( NetboxURL + "dcim/devices/")

    netboxDevice.selectAllNetboxDevices();
    netboxDevice.deleteAllNetboxDevices();
    netboxDevice.deleteConfirmationCONDITIONAL();
})
Then('I should not see the {int} devices in Zabbix', (number_devices)=>{

    cy.visit( ZabbixURL + "zabbix.php?action=host.list")
    
    let clone = "Delete_Clone_"
    let tag_number = 1

    for (tag_number = 1; tag_number <= number_devices; tag_number++ ){
        zabbixHost.resetFilters()
        zabbixHost.enterHostnameFilter(clone + tag_number)
        zabbixHost.clickApplyButton()
    }
    // Assertions
    cy.get(zabbixHost.TABLE_HOST).should('not.have.text', clone + tag_number)
})