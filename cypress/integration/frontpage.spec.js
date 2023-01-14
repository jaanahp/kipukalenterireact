describe('Frontpage', function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(function () {
        cy.visit('http://localhost:3000/')
        cy.get('#hpuserinput').type('testiad')
        cy.get('#hpuserpass').type('Kaapeli01')
        cy.get('#submitlogin').click()
        cy.wait(500)
    })

    it('Login works and site opens', function() {
        cy.contains('Kirjautuneena')
        cy.contains('Lisää kipumerkintä')
        cy.contains('Lisää sijainti')
    })

    it('Add Location works right', function () {
        cy.get('#hpaddloc').click()
        cy.contains('Lisää sijainti')
        cy.get('#locationInput').type('Cypress-testFrontpage')
        cy.get('#submitlocation').click()
        cy.wait(500)
        cy.visit('http://localhost:3000/Location')
        cy.contains('Postman API test 2')
        cy.get('.notepage').last().contains('Cypress-testFrontpage')
    })

    it('Add Painlog works right', function () {
        cy.get('#hpaddpainlog').click()
        cy.contains('Lisää kipumerkintä')
        cy.get('#intensity').type(5)
        cy.get('#starttime').type('2022-06-05T09:42')
        cy.get('#endtime').type('2022-06-05T10:42')
        cy.get('#locationselect').select('105')
        cy.get('#submitpainlog').click()
        cy.wait(500)
        cy.visit('http://localhost:3000/Painlog')
        cy.get('.notepage').first().contains('Alkupäivämäärä: 5.6.2022 ')
        cy.get('.notepage').first().contains('Pää')
    })
})