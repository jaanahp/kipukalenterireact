describe('Painlog', function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(function () {
        cy.visit('http://localhost:3000/')
        cy.get('#hpuserinput').type('testiad')
        cy.get('#hpuserpass').type('Kaapeli01')
        cy.get('#submitlogin').click()
        cy.wait(500)
        cy.visit('http://localhost:3000/Painlog')
    })

    it('Site opens', function() {
        cy.contains('Kipumerkinnät')
        cy.contains('Alkupäivämäärä: 5.6.2022')
        cy.contains('Kivun sijainti: Pää')
    })

    it('Add Painlog works right', function () {
        ccy.get('.nappi').click
        cy.contains('Lisää kipumerkintä')
        cy.get('#intensity').type(5)
        cy.get('#starttime').type('2022-06-05T09:42')
        cy.get('#endtime').type('2022-06-05T10:42')
        cy.get('#locationselect').select('107')
        cy.get('#submitpainlog').click()
        cy.wait(500)
        cy.get('.notepage').first().contains('Alkupäivämäärä: 5.6.2022 ')
    })

    it('Remove Painlog works', function () {
        cy.get('#logdelete').first().click()
        cy.wait(500)
        cy.get('.notepage').first().should('not.contain', 'Alkupäivämäärä: 5.6.2022')
    })

})