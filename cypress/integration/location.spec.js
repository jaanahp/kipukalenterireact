describe('Location', function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(function () {
        cy.visit('http://localhost:3000/')
        cy.get('#hpuserinput').type('testiad')
        cy.get('#hpuserpass').type('Kaapeli01')
        cy.get('#submitlogin').click()
        cy.wait(500)
        cy.visit('http://localhost:3000/Location')
    })

    it('Site opens', function() {
        cy.contains('Kivun sijainti')
        cy.contains('ID 104')
        cy.contains('Pää')
    })

    it('Add Location works right', function () {
        cy.wait(500)
        cy.get('.nappi').click()
        cy.wait(500)
        cy.contains('Lisää sijainti')
        cy.get('#locationInput').type('Cypress-testLocation')
        cy.get('#submitlocation').click()
        cy.wait(500)
        cy.get('.notepage').last().contains('Cypress-testLocation')
    })

    it('Remove Location works', function () {
        cy.get('#locdelbutton').last().click()
        cy.wait(500)
        cy.get('div').last().should('not.contain', 'Cypress-testLocation')
    })

})