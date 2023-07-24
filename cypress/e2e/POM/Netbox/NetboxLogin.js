
const usernameInput = '#id_username'
const passwordInput = '#id_password'
const loginButton = 'form > .btn'

class NetboxLogin{

    openURL(){
        cy.visit(endpoint)
    }
    enterUsername(username){
        cy.get(usernameInput).type(username)
    }
    enterPassword(password){
        cy.get(passwordInput).type(password)
    }
    clickLoginButton(){
        cy.get(loginButton).click()
    }
}

export const netboxLogin = new NetboxLogin()
