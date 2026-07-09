describe("Dashboard Overview Page", () => {
  it("should allow user to access dashboard overview after login", () => {
    cy.viewport(1366, 768);

    cy.visit("http://localhost:5173/login");

    cy.get("input#email")
      .should("be.visible")
      .type("hello@example.com");

    cy.get("input#password")
      .should("be.visible")
      .type("123456");

    cy.get("button").contains("Login").click();

    cy.url().should("include", "/");

    cy.contains("Overview").should("be.visible");
    cy.contains("Total Balance").should("be.visible");
    cy.contains("Goals").should("be.visible");
    cy.contains("Upcoming Bill").should("be.visible");
    cy.contains("Recent Transaction").should("be.visible");
    cy.contains("Statistics").should("be.visible");
    cy.contains("Expenses Breakdown").should("be.visible");
  });
});