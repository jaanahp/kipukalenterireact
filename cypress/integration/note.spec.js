describe('Note', function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(function () {
        cy.visit('http://localhost:3000/')
        cy.get('#hpuserinput').type('testiad')
        cy.get('#hpuserpass').type('Kaapeli01')
        cy.get('#submitlogin').click()
        cy.wait(200)
        cy.visit('http://localhost:3000/Note')
    })

    it('Site opens', function() {
        cy.contains('Muistiinpanot')
        cy.contains('Päivämäärä: 1.4.2022')
        cy.contains('Testing note controller')
    })

    it('Add Note works right', function () {
        cy.wait(500)
        cy.get('#addnote1').click()
        cy.wait(500)
        cy.contains('Lisää muistiinpano')
        cy.get('#notedate').type('2022-06-05T09:42')
        cy.get('#notetext').type('Cypress-testNote')
        cy.get('#submitnote').click()
        cy.wait(500)
        cy.get('.notepage').first().contains('Päivämäärä: 5.6.2022')
    })

    it('Remove Note works', function () {
        cy.get('#notedelete').first().click()
        cy.wait(500)
        cy.get('.notepage').first().should('not.contain', 'Päivämäärä: 5.6.2022')
    })

})