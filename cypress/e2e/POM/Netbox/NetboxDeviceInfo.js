const DELETE_BUTTON = ".btn.btn-sm.btn-danger"
const DELETE_CONFIRMATION_BUTTON = "div.modal-footer button.btn.btn-danger:contains('Delete')"

const CLONE_BUTTON = ".btn.btn-sm.btn-success"

class NetboxDeviceInfo{

    

    clickDeleteButton(){
        cy.get(DELETE_BUTTON).click()
    }
    clickDeleteConfirmationButton(){
        cy.get(DELETE_CONFIRMATION_BUTTON).click()
    }

    clickCloneButton(){
        cy.get(CLONE_BUTTON).click()
    }
}
export const netboxDeviceInfo = new NetboxDeviceInfo()
