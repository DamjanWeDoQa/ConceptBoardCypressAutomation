const {
  DashboardPage,
  CreateBoardPage,
  BoardPage,
} = require("./conceptBoardObjects.js");

import "cypress-file-upload";

describe("Conceptboard", () => {
  const dashboardPage = new DashboardPage();
  const createBoardPage = new CreateBoardPage();
  const boardPage = new BoardPage();

  beforeEach(() => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
  });

  it("should allow the user to create a new board", () => {
    createBoardPage.createBoard("My New Board");
    cy.contains("My New Board").should("be.visible");
  });

  it("should allow the user to add item(s) on the canvas", () => {
    cy.wrap(createBoardPage.createBoard("My New Board - Add")).then(() => {
      cy.wait(1000);
      boardPage.insertIconOnCanvas();
    });
  });

  it("should allow the user to draw a line on canvas", () => {
    cy.wrap(createBoardPage.createBoard("My New Board - Draw")).then(() => {
      cy.wait(1000);
      boardPage.drawLine();
    });
  });

  it("should allow the user to delete items from canvas", () => {
    cy.wrap(createBoardPage.createBoard("My New Board - Delete")).then(() => {
      cy.wait(1000); 
      boardPage.insertIconOnCanvas();
      boardPage.deleteItem();
    });
  });

  it("should allow the user to zoom in and out of the board", () => {
    createBoardPage.createBoard("My New Board");
    boardPage.zoomIn();
    boardPage.zoomOut();
  });

  it("should allow the user to export the board as an image", () => {
    createBoardPage.createBoard("My New Board");
    boardPage.exportBoardAsImage();
  });

  it("should allow the user to rename a board", () => {
    createBoardPage.createBoard("My New Board");
    boardPage.renameBoard("My New Board - Rename");
  });
});
