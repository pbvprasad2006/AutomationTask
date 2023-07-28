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
            Cypress.Screenshot.defaults({
                screenshotOnRunFailure: false,
                blackout:['iframe']
            })
            //Step to launch the TD App
            hmPage.lauchTDApp()

            //Click on the menu links
            hmPage.openMenuLinks().click()

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

            cy.frameLoaded('iframe.aut-iframe').as('iframe')
            // cy.iframe('iframe.aut-iframe').find('ul.jaVibZ').then(function(){
            //     cy.get('ul.jaVibZ').should('be.visible')
            // })

            // cy.get('@iframe').each(($el, index, $list) => {
            //     $el.find('ul.jaVibZ').should('be.visible')

            // })

            // cy.iframe('iframe.aut-iframe').then(($iframe) => {
            //     const $body = $iframe.contents().find('body')
            //     cy.wrap($body).find('ul.jaVibZ').should('be.visible')
            // })

            // cy.iframe('iframe.aut-iframe').find('ul.jaVibZ').should('be.visible').then(($el) => {
            //     cy.log($el.length)
            // })

            // cy.get('ul.jaVibZ', {timeout : 10000}).should('be.visible')

            // cy.xpath("//span[contains(text(), 'Forums')]").should('be.visible').then(($el) => {
            //     cy.log($el.length)
            // })
            
            // Step to find the Forums links and validate the count
            cy.get('ul.jaVibZ').find("li.fJHqiq a span").should('be.visible').then(($el) => {
                const len = $el.length
                expect(6).to.equal($el.length)
            })

            //Step to click on the first forum link and validate the page dispalyed correctly for the first link
            cy.get('ul.jaVibZ').find("li.fJHqiq a h2").then(($el) => {
                const text = $el.eq(0).text()
                cy.log("first link text : " + text)
                $el.eq(0).click()
                cy.get('.message-subject > span > div').should('be.visible').then(($e2) => {
                    const text1 = $e2.text().replace(/\n/g, '').replace(/\t/g, '')
                    cy.log("second page text : " + text1)
                    expect(text).to.contain(text1)
                })
            })

        })
})
