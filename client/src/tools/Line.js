import Tool from "./Tool";

export default class Line extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      this.draw(currentX, currentY);
    }
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    let endX = e.pageX - e.target.offsetLeft;
    let endY = e.pageY - e.target.offsetTop;
    this.draw(endX, endY);
  }

  draw(x, y) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      // clear canvas and redraw saved state first
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      // draw our straight line from start to current point
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }
}
