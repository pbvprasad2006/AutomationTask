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

            cy.document().then((doc) => {
                if (doc.readyState === 'complete'){
                    cy.log('Page is fully loaded')
                } else {
                    cy.wait(10000)
                    cy.log('Page waited to be loaded')
                }
            })
            
            cy.get('ul.jaVibZ').find('li.fJHqiq').each(($el, index, $list) => {
                const textVal = cy.wrap($el).find('.POGSS').text()
                cy.log(textVal)
            })
            
            // cy.get('.fJHqiq a h2').each(($el, index, listValues) => {
            //     cy.log($e1.text())
            // })


            // cy.get('.fJHqiq > a > span').then(($visibleEleCounts) => {
            //     cy.log("Length count - ", $visibleEleCounts.length)
            //     cy.get($visibleEleCounts).each(($el, index, $list) => {
            //         cy.log($el.text())
            //     })
            // })

            // cy.get('ul.jaVibZ').then(($el) => {
            //     cy.log("Length : " + $el.length)
            //     expect(5).to.equal($el.length)
            // })

            // hmPage.searchSelectionResults().contains('Forums').should('be.visible').as('resultsList1')
            // hmPage.searchSelectionResults().as('resultsList')
            // cy.get('@resultsList').each(($el, index, $list) => {
            //     const textvalue = $el.text()
            //     cy.log("Text Value == ", textvalue)
            // })










            // cy.get('.styles__Label-sc-bltbnk-1').should('be.visible').should('be.visible')

            
            // cy.get('.styles__ListContainer-sc-1aohvhp-6', { timeout: 10000 }).each(($el, index, $list) => {
            //     const linkText = $el.text()
            //     cy.log("Link Text : ", linkText)
            // })





            // waitUntilVisible("//span[@class='styles__Label-sc-bltbnk-1 POGSS' and contains(text(), 'Forums')]/..//h2").then(($element)=> {
            //     cy.log("Element is visible :", $element.text())
            // })

            // cy.xpath("//span[@class='styles__Label-sc-bltbnk-1 POGSS' and contains(text(), 'Forums')]/..//h2").should('be.visible', {timeout : 15000})
            // cy.xpath("//span[@class='styles__Label-sc-bltbnk-1 POGSS' and contains(text(), 'Forums')]/..//h2").each(($link, index, $value) => {
            //     const linkText = $link.text()
            //     cy.log(linkText)
            // })

            // // cy.xpath("//span[@class='styles__Label-sc-bltbnk-1 POGSS' and contains(text(), 'Forums')]/..//h2").should('be.visible')
            // cy.xpath("//span[@class='styles__Label-sc-bltbnk-1 POGSS' and contains(text(), 'Forums')]/..//h2").then(($link, index, $value) => {
            //     expect(6).to.equal($link.length)
            // })

            

            // cy.get(".styles__Label-sc-bltbnk-1", { timeout: 50000 }).should('be.visible').each(($el, index, $list) => {
            //     const linkText = $el.text()
            //     cy.log("Link Text : ", linkText)
            // })

            // cy.xpath("//span[contains(text(), 'Forums')]").should('be.visible').click()

            
            
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
