describe('User', function () {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach(function () {
        cy.visit('http://localhost:3000/')
        cy.get('#hpuserinput').type('testiad')
        cy.get('#hpuserpass').type('Kaapeli01')
        cy.get('#submitlogin').click()
        cy.wait(500)
        cy.visit('http://localhost:3000/User')
    })

    it('Site opens', function() {
        cy.contains('Käyttäjät')
        cy.contains('Käyttäjä: testiad')
    })

    it('Add user works right', function () {
        cy.get('.nappi').click
        cy.contains('Lisää käyttäjä')
        cy.get('#emailinput').type('Cypress@test')
        cy.get('#userinput').type('Cypress1')
        cy.get('#submitnote').click()
        cy.wait(500)
        cy.get('#logout').click
        cy.get('#hpuserinput').type('testiad')
        cy.get('#hpuserpass').type('Kaapeli01')
        cy.get('#submitlogin').click()
        cy.wait(500)
        cy.contains('Cypress1')
    })

})