describe('My First Test', () => {
  it('Sanity test', () => {
    cy.visit('/')
    cy.contains('app is running')
  })
})
