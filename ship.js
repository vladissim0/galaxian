const COLUMNS_COUNT = 8;

class Ship{
    constructor(element, column){
        this.element = element;
        this.column = column
    }

    moveLeft() {
    if (this.column > 0) {
      this.column--;
      this.updatePosition();
    }
  }

  moveRight() {
    if (this.column < COLUMNS_COUNT - 1) {
      this.column++;
      this.updatePosition();
    }
  }

  updatePosition() {
    this.element.style.left = `${this.column * 40}px`;
  }


   shoot(gameField) {
    const laser = document.createElement("div");

    laser.classList.add("laser");

    laser.style.left = `${this.column * 40 + 17}px`;
    laser.style.bottom = "40px";

    gameField.appendChild(laser);

    return laser;
  }

}


class Enemy {
  constructor(element, column, row) {
    this.element = element;
    this.column = column;
    this.row = row;

    this.top = row * 40;
  }

  updatePosition() {
    this.element.style.left = `${this.column * 40}px`;
    this.element.style.top = `${this.top}px`;
  }

  moveDown() {
    this.top += 5;
    this.updatePosition();
  }
}