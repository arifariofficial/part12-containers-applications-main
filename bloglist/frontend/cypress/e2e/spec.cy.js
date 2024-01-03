describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      username: "root",
      name: "Superuser",
      password: "secret",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);

    const user2 = {
      username: "ariful",
      name: "Ariful Islam",
      password: "secret",
    };
    cy.request("POST", "http://localhost:3003/api/users", user2);

    cy.visit("http://localhost:3003");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("login");
  });

  describe("Login", function () {
    it("success with current credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("secret");
      cy.get("#login-button").click();
      cy.contains("Superuser logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("root");
      cy.get("#password").type("hello");
      cy.get("#login-button").click();
      cy.contains("wrong credentials");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logging in", function () {
    beforeEach(function () {
      cy.get("#username").type("root");
      cy.get("#password").type("secret");
      cy.get("#login-button").click();
    });

    it("A blog can be createed", function () {
      cy.contains("create new").click();
      cy.get("#title").type("A blog created by cypress");
      cy.get("#author").type("Ariful Islam");
      cy.get("#url").type("www.yahoo.com");
      cy.get("#create-button").click();
      cy.contains("A blog created by cypress");
    });

    describe("when there is blog", function () {
      beforeEach(function () {
        cy.contains("create new").click();
        cy.get("#title").type("A blog created by cypress");
        cy.get("#author").type("Ariful Islam");
        cy.get("#url").type("www.yahoo.com");
        cy.get("#create-button").click();
        cy.wait(2000);
      });

      it.skip("users can like a blog", function () {
        cy.wait(5000);
        cy.contains("A blog created by cypress").click();
        cy.get("#like").click();
        cy.contains("1 likes");
      });

      it.skip("user who created a blog can delete it", function () {
        cy.contains("A blog created by cypress").click();
        cy.contains("remove").click();
        cy.contains("A blog created by cypress").should("not.exist");
      });

      it.skip("only creator can see the delete button", function () {
        cy.contains("logout").click();
        cy.get("#username").type("ariful");
        cy.get("#password").type("secret");
        cy.get("#login-button").click();
        cy.contains("view").click();
        cy.contains("remove").should("not.exist");
      });
    });
    describe("blogs are ordered according to likes", function () {
      beforeEach(function () {
        cy.get("#new-blog-button").click();
        cy.get("#title").type("blog with like 2");
        cy.get("#author").type("Ariful Islam");
        cy.get("#url").type("www.yahoo.com");
        cy.get("#create-button").click();

        cy.get("#new-blog-button").click();
        cy.get("#title").type("blog with like 3");
        cy.get("#author").type("Ariful Islam");
        cy.get("#url").type("www.yahoo.com");
        cy.get("#create-button").click();

        cy.get("#new-blog-button").click();
        cy.get("#title").type("blog with like 4");
        cy.get("#author").type("Ariful Islam");
        cy.get("#url").type("www.yahoo.com");
        cy.get("#create-button").click();

        cy.contains("blog with like 2").as("blog1").click();
        cy.contains("blog with like 2").parent();
        cy.get("#like").as("button1");
        cy.wait(1000);

        cy.contains("blogs").click();
        cy.contains("blog with like 3").as("blog2").click();
        cy.contains("blog with like 3").parent();
        cy.get("#like").as("button2");
        cy.wait(2000);

        cy.contains("blogs").click();
        cy.contains("blog with like 4").as("blog3").click();
        cy.contains("blog with like 4").parent();
        cy.get("#like").as("button3");
      });

      it("blogs are sorted", function () {
        cy.contains("blogs").click();
        cy.get("@blog1").click();
        cy.get("@button1").click();
        cy.wait(300);
        cy.get("@button1").click();
        cy.wait(300);

        cy.contains("blogs").click();
        cy.get("@blog2").click();
        cy.get("@button2").click();
        cy.wait(300);
        cy.get("@button2").click();
        cy.wait(300);
        cy.get("@button2").click();
        cy.wait(300);

        cy.contains("blogs").click();
        cy.get("@blog3").click();
        cy.get("@button3").click();
        cy.wait(300);
        cy.get("@button3").click();
        cy.wait(300);
        cy.get("@button3").click();
        cy.wait(300);
        cy.get("@button3").click();
        cy.wait(300);

        cy.contains("blogs").click();

        cy.get("#blog").then((blogs) => {
          cy.wrap(blogs[0]).contains("4");
          cy.wrap(blogs[1]).contains("3");
          cy.wrap(blogs[2]).contains("2");
        });
      });
    });
  });
});
