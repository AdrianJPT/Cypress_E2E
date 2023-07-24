const DEVICE_NAME = "#id_name"

const DEVICE_OPTION_TEMPLATE = "div.ss-option:contains('{}')"

const DEVICE_ROLE_BOX = "div.col select#id_device_role ~ div:first-of-type"    
const DEVICE_TYPE_BOX = "div.col select#id_device_type ~ div:first-of-type"
const DEVICE_SITE_BOX = "div.col select#id_site ~ div:first-of-type"
const DEVICE_PLATFORM_BOX = "div.col select#id_platform ~ div:first-of-type"

const CREATE_BUTTON = "button[name='_create']"

class NetboxDeviceConfig{

    enterDeviceName(DeviceName){
        cy.get(DEVICE_NAME).type(DeviceName)
    }
    selectDeviceRole(DeviceRole){
        cy.get(DEVICE_ROLE_BOX).click()

        let OPTION = DEVICE_OPTION_TEMPLATE.replace('{}', DeviceRole);
        cy.get(OPTION).click()
    }
    selectDeviceType(DeviceType){
        cy.get(DEVICE_TYPE_BOX).click()

        let OPTION = DEVICE_OPTION_TEMPLATE.replace('{}', DeviceType);
        cy.get(OPTION).click()
    }
    selectSite(Site){
        cy.get(DEVICE_SITE_BOX).click()

        let OPTION = DEVICE_OPTION_TEMPLATE.replace('{}', Site);
        cy.get(OPTION).click()
    }
    selectPlatform(Platform){
        cy.get(DEVICE_PLATFORM_BOX).click()

        let OPTION = DEVICE_OPTION_TEMPLATE.replace('{}', Platform);
        cy.get(OPTION).click()
    }
    clickCreateButton(){
        cy.get(CREATE_BUTTON).click()
    }

}


export const netboxDeviceConfig = new NetboxDeviceConfig()
