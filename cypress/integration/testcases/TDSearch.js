//Test : to validate the Telus.com search bar
/// <reference types="cypress" />
import '../../support/commands'
import 'cypress-xpath'
import homePage from '../Pages/homePage.js'
import 'cypress-iframe'

const waitUntilVisible = (xpathLocator, maxAttempts = 10, currentAttempt = 0) => {
    return cy.xpath(xpathLocator).should('be.visible').then(($element) => {
        if(Cypress.dom.isVisible($element) || currentAttempt >= maxAttempts) {
            return $element
        }

        const dealy = 1000
        return cy.wait(dealy).then(() => {
            return waitUntilVisible(xpathLocator, maxAttempts, currentAttempt + 1)
        })
    })
}

describe('TD Search Scenarios', function(){

        it('Validation of TD Search Bar', function() {
            const hmPage = new homePage()
            let actValue
            
            //Step to launch the TD App
            hmPage.lauchTDApp()

            //Click on the menu links
            // hmPage.openMenuLinks().click()

            //click on the search button
            hmPage.clickSearchIcon().click()
            
            //Enter the search text in the search bar
            hmPage.searchTextBox().type("Internet")
            
            //Read the search list 3rd element
            hmPage.searchResultsList().should('be.visible')
            hmPage.searchResultsList().contains('Internet Troubleshooting:').should('be.visible').as('thValue')
            hmPage.searchResultsList().as('listValues')
            cy.get('@listValues').each(($el, index, $list) => {
                const textValue = $el.text()
                cy.log(index + " : " + textValue)
                if(textValue.includes('Internet Troubleshooting:')){
                    actValue = textValue
                    cy.log("Found - " + actValue)
                    cy.wrap($el).click()
                }
            })
            
            //Step to validate the selected text dispalyed
            hmPage.searchSelection().should('be.visible')
            hmPage.searchSelection().invoke("text").then((actText) => {
                expect(actText).to.contain(actValue)
            })

            //Step to wait for the page to load completely
            cy.document().then((doc) => {
                if (doc.readyState === 'complete'){
                    cy.log('Page is fully loaded')
                } else {
                    cy.wait(10000)
                    cy.log('Page waited to be loaded')
                }
            })

            cy.get('ul.jaVibZ', {timeout : 10000}).should('be.visible')

            cy.xpath("//span[contains(text(), 'Forums')]").should('be.visible').then(($el) => {
                cy.log($el.length)
                expect(6).to.equal($el.length)
            })

            //Step to click on the first forum link and validate the page dispalyed correctly for the first link
            cy.get('ul.jaVibZ').find("li.fJHqiq a h2").then(($el) => {
                const text = $el.eq(0).text()
                cy.log("first link text : " + text)
                cy.wrap($el.eq(0)).click()
                cy.get('.message-subject > span > div').should('be.visible').then(($e2) => {
                    const text1 = $e2.text().replace(/\n/g, '').replace(/\t/g, '')
                    cy.log("second page text : " + text1)
                    expect(text).to.contain(text1)
                })
            })

        })
})
