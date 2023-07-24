
const SELECT_ALL_DEVICES_BUTTON = "input[title='Toggle All']"
const DELETE_SELECTED_BUTTON = "button[name='_delete'] i[class='mdi mdi-trash-can-outline']"
const DELETE_CONFIRMATION_BUTTON = "button[name='_confirm']"

const ADD_BUTTON = ".control-group > .btn-success > .mdi"

DEVICE_TEMPLATE = "a:contains('{}')"

class NetboxDevice{

    openURL(){
        cy.visit(ENDPOINT)
    }
    selectAllNetboxDevices(){
        cy.get(SELECT_ALL_DEVICES_BUTTON).click()
    }
    deleteAllNetboxDevices(){
        cy.get(DELETE_SELECTED_BUTTON).click()
    }
    deleteConfirmationCONDITIONAL(){
        Cypress.on('fail', (error, runnable) => {
            if (!error.message.includes(DELETE_CONFIRMATION_BUTTON)) {
                cy.log("DEVICES NOT FOUND")
                cy.log(err.message);
                return false;
            }
        })
        cy.get(DELETE_CONFIRMATION_BUTTON).click();
        
    }

    clickToADDbutton(){
        cy.get(ADD_BUTTON).click()
    }

    clickDevice(Device){
        let DEVICE_NETBOX = DEVICE_TEMPLATE.replace('{}', Device);
        cy.get(DEVICE_NETBOX).click()
    }

}


export const netboxDevice = new NetboxDevice()
