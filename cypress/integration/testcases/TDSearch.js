//Test : to validate the Telus.com search bar
/// <reference types="cypress" />
import '../../support/commands'
import 'cypress-xpath'
import homePage from '../Pages/homePage.js'

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
            
            
            hmPage.searchSelection().should('be.visible')
            hmPage.searchSelection().invoke("text").then((actText) => {
                expect(actText).to.contain(actValue)
            })


            waitUntilVisible("//span[@class='styles__Label-sc-bltbnk-1 POGSS' and contains(text(), 'Forums')]/..//h2").then(($element)=> {
                cy.log("Element is visible :", $element.text())

            })

            cy.xpath("//span[@class='styles__Label-sc-bltbnk-1 POGSS' and contains(text(), 'Forums')]/..//h2").should('be.visible')
            cy.xpath("//span[@class='styles__Label-sc-bltbnk-1 POGSS' and contains(text(), 'Forums')]/..//h2").each(($link, index, $value) => {
                const linkText = $link.text()
                cy.log(index, linkText)
            })

            cy.xpath("//span[@class='styles__Label-sc-bltbnk-1 POGSS' and contains(text(), 'Forums')]/..//h2").should('be.visible')
            cy.xpath("//span[@class='styles__Label-sc-bltbnk-1 POGSS' and contains(text(), 'Forums')]/..//h2").then((links) => {
                expect(6).to.equal(links.length)
            })



            // cy.get('.styles__ResultContainer-sc-1aohvhp-3 .styles__ListItem-sc-1aohvhp-7 a span').each(($link, index, $list) => {
            //     const linkText = $link.text()
            //     cy.log("Link Text : ", linkText)
            // })
            
            
            // cy.get('span').should('have.text', 'Forums')

            // cy.contains('span', 'Forums').should('be.visible')


            // cy.xpath("//div[contains(text(), 'Showing 6')]").shadow('be.visible')
            // cy.xpath(hmPage.searchSelectionResults()).should('be.visible')

            // cy.get('.css-1rynq56').contains('span', 'Forums').should('be.visible')

            // cy.get('.styles__UniversalBodyContainer-sc-1aohvhp-0 > :nth-child(2) > .styles__UniversalResultsContainer-sc-1aohvhp-2 > :nth-child(1)')

            
            // cy.xpath("//div[text() = 'Forums']/../..//a").should('be.visible')




            // hmPage.searchResultsList().contains('Internet Troubleshooting:').invoke("text").then((text) => {
            //     thValue = text
            // })

            // hmPage.searchResultsList().invoke("text").as("listText")
            
            // //Click on the 3 result
            // hmPage.searchResultsList().click()

            // //Step to validate the search selection results
            // hmPage.searchSelection().should('be.visible').invoke("text").as("listText1")
            
            // cy.get("@listText").then((text) => {

            //     cy.log("Value : ", text)

            //     hmPage.searchSelection().invoke("text").then
                
            // })


            // hmPage.searchSelection().should('have.text', thValue[0])
            
            // hmPage.searchSelection().contains("'" + thValue[0] + "'").then(function($elem){
            //     thValue1.push($elem.text())
            // })

            // cy.log("Search Result Value : ", thValue1)
        })
})
