
const USERNAME_INPUT = "#name"
const PASSWORD_INPUT = "#password"
const LOGIN_BUTTON = "#enter"

class ZabbixLogin{
    openURL(){
        cy.visit(ENDPOINT)
    }
    enterUsername(Username){
        cy.get(USERNAME_INPUT).type(Username)
    }
    enterPassword(Password){
        cy.get(PASSWORD_INPUT).type(Password)
    }
    clickLoginButton(){
        cy.get(LOGIN_BUTTON).click()
    }

}

export const zabbixLogin = new ZabbixLogin()
