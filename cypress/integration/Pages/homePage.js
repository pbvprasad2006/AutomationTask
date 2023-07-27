class homePage{
    
    lauchTDApp() {
        //Step to launch the app
        cy.visit("https://www.telus.com/en")

        //Step to validate the page is loaded successfully
        this.validateTDLogo().should('be.visible')
    }

    validateTDLogo() {
        return cy.get('.sc-lnPyaJ.giduLE', {
            timeout: 10000
          }).should('be.visible')
    }

    openMenuLinks() {
        return cy.get('[data-test="hamburgerLink"]')
    }

    clickSearchIcon() {
        return cy.get("#search-input div[aria-label='Search']")
    }

    searchButton() {
        return cy.get('.sc-jOnpCo #search-button')
    }

    searchTextBox() {
        return cy.get("[placeholder='Search']")
    }

    searchResultsList() {
        return cy.get('.jOUPgh', {
            timeout: 10000
          })
    }

    searchSelection(){
        return cy.get(".ebtrSW > [dir='auto']", {
            timeout: 10000
          })
    }

    searchSelectionResults() {
        return "//div[text() = 'Forums']/../..//a"
    }
}

export default homePage;