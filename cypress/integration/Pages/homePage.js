class homePage{
    
    lauchTDApp() {
        cy.viewport(1920, 1080)
        
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
        return cy.get("button#search-button")
    }

    searchButton() {
        return cy.get('.sc-jOnpCo #search-button')
    }

    searchTextBox() {
        return cy.get('input[placeholder="Search TELUS.com"]')
    }

    searchResultsList() {
        return cy.get('li[data-test="searchResultItem"] a.sc-eZkCL.dSJsOL', {
            timeout: 10000
          })
    }

    searchSelection(){
        return cy.get(".ebtrSW > [dir='auto']", {
            timeout: 10000
          })
    }

    searchSelectionResults() {
        return cy.get(".fJHqiq a h2", {
            timeout: 20000
          })
    }
}

export default homePage;