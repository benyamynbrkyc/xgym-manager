const url = "https://example.cypress.io"

describe('My first test', () => {
    it('Visits the kitchen sink', () => {
        cy.visit(url)

        cy.contains('type')
    })
})