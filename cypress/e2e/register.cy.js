describe("User Register", () => {

  it("should show register page", () => {
    cy.viewport(550, 750);
    cy.visit("http://localhost:5173/register");

    cy.contains("Create an account");
    cy.contains("Name");
    cy.contains("Email address");
    cy.contains("Password");
    cy.contains("Sign Up");
  });

  it("should allow user to input register form", () => {
    cy.viewport(550, 750);
    cy.visit("http://localhost:5173/register");

    cy.get('input[name="name"]')
      .should("be.visible")
      .should("have.attr", "placeholder", "Evan Arya")
      .type("Evan Arya")
      .should("have.value", "Evan Arya");

    cy.get('input[name="email"]')
      .should("be.visible")
      .clear()
      .type("111202314886@mhs.dinus.ac.id")
      .should("have.value", "111202314886@mhs.dinus.ac.id");

    cy.get('input[name="password"]')
      .should("be.visible")
      .clear()
      .type("123456")
      .should("have.value", "123456");

    cy.get('input[type="checkbox"]').check();

    cy.get("button").contains("Sign Up").click();
  });

});