import "cypress-file-upload";
import "cypress-real-events";

const createBoardButton = ".button.new-board-button";
const boardTitle = ".button.quiet[tabindex='0']";
const newBoardTitle = '.button.quiet[tabindex="0"]';
const boardNameInput = 'span[class="full-width"] input[type="text"]';
const createBoardButton2 =
  'section[aria-label="Dialog footer"] button[class="button-container button"]';
const boardPaneButton =
  'div[class="left-board-pane import-content-pane-container"] button[class="button-container no-text button quiet"]';
const lineIcon = ".middle [aria-role='button']:nth-child(7)";
const padUnderlay = "#padUnderlay";
const zoomInButton = ".zoom-in-button";
const zoomOutButton = ".zoom-button.zoom-out-button";
const zoomDisplay = "[aria-label] > [aria-role='button']:nth-child(4)";
const exportButton = ".board-menu > button:nth-of-type(1)";
const exportImageButton =
  ".simple-app-menu [aria-haspopup='true']:nth-of-type(10)";
const exportFormatButtonIMG = "li:nth-of-type(3) > a[target='_blank']";
const val = "";
const drawnLine =
  "#padUnderlay > div.underlay-inner > svg > g > g > path:nth-child(2)";
const insertIcon =
  ".pretty-scrollbars > .sidebar-content > .action-button-container > :nth-child(5)";
const iconBar =
  'div[class="left-board-pane insert-icon-pane-container"] div[class="sidebar-content pretty-scrollbars scroll-container"]';
const planeIcon =
  "body > div:nth-child(2) > div:nth-child(12) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)";
const placedIcon = "#padUnderlay > div.underlay-inner > svg > g";
const placedIconThreeDots = ".tb-button.more-btn.margin-correction-right";
const placedIconDeleteIcon =
  ".tb-button.icon-only.flex.margin-correction-right";

class DashboardPage {
  clickCreateBoardButton() {
    cy.get(createBoardButton).click();
  }
}

class CreateBoardPage {
  createBoard(boardName) {
    cy.get(createBoardButton).invoke("removeAttr", "target").click();
    cy.wait(1000);
    cy.get(boardTitle).should("be.visible");
    cy.wait(1000);
    cy.get(newBoardTitle).click();
    cy.wait(1000);
    cy.get(boardNameInput).type(boardName);
    cy.wait(1000);
    cy.get(createBoardButton2).click();
    cy.wait(1000);
    cy.get(`.button.quiet[tabindex="0"]`).contains(boardName);
  }
}

class BoardPage {
  renameBoard(boardName) {
    cy.get(newBoardTitle).click();
    cy.wait(1000);
    cy.get(boardNameInput).clear();
    cy.wait(1000);
    cy.get(boardNameInput).type(boardName);
    cy.wait(1000);
    cy.get(createBoardButton2).click();
    cy.wait(1000);
    cy.get(boardTitle).should("have.text", boardName);
  }

  drawLine() {
    cy.get(boardPaneButton).click();
    cy.get(lineIcon).click({ force: true });
    cy.get(padUnderlay).realMouseDown({ position: "center" });
    cy.get(padUnderlay).realMouseMove(500, 500, { position: "center" });
    cy.get(padUnderlay).realMouseUp({ position: "bottomRight" });
    cy.wait(1000);
    cy.get(drawnLine).should("be.visible");
  }

  insertIconOnCanvas() {
    cy.get(insertIcon).click();
    cy.get(planeIcon).dblclick("center");
    cy.get(placedIcon).should("exist");
  }

  deleteItem() {
    cy.get(placedIconThreeDots).click();
    cy.get(placedIconDeleteIcon).click();
    cy.get(placedIcon).should("not.be.visible");
  }

  zoomIn() {
    cy.get(zoomInButton).click();
    cy.get(zoomDisplay).wait(1000).should("contain.text", "113%");
  }

  zoomOut() {
    cy.get(zoomOutButton).click();
    cy.get(zoomDisplay).wait(1000).should("contain.text", "90%");
  }

  exportBoardAsImage() {
    cy.get(exportButton).click();
    cy.get(exportImageButton).realHover({ position: "center" });
    cy.get(exportFormatButtonIMG)
      .then(($a) => {
        expect($a).to.have.attr("target", "_blank");
        // update attr to open in same tab
        $a.attr("target", "_self");
      })
      .click({ force: true });
    cy.url().should("include", "/export");
  }
}

module.exports = {
  DashboardPage,
  CreateBoardPage,
  BoardPage,
};
