//re-usable custome commands

describe('Custom commands', () => {

    Cypress.Commands.add("launchTDapp", () => {

        //Step to launch the app
        cy.visit("https://www.telus.com/en")
        
        //Step to validate the page is loaded successfully
        cy.get('.sc-lnPyaJ.giduLE').should('be.visible')
    })

    

})