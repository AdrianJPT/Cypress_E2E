pinButton = ".mdi.mdi-pin"

class NetboxMain{

    clickPinedButton(){
        cy.get(pinButton).click()
    }
}

export const netboxMain = new NetboxMain()
