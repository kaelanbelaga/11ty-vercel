module.exports = async function() {

  return `
  <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eleventy Kitchen Sink</title>
  </head>
  <body>
  <style> 
    img { 
      max-width: 100%; 
      height: auto; 
    }
    .grid {
      width: 100vw;
      height: 100vh;
      display: flex;
    }
    .grid div {
      flex: 0 0 50%;
    }
    .grid div img {
      width: 100%;
    }
  </style>

    <h1>About</h1>
    <div class="grid">
      <div> 
        ${await this.respImg('./src/assets/img/01.jpg', 'A nice Image')}
        ${await this.respImg('./src/assets/img/02.jpg', 'A nice Image')}
        ${await this.respImg('https://images.unsplash.com/photo-1597176069039-aa331e8851cb', 'A nice Image')}
      </div>
      <div>
        ${await this.respImg('./src/assets/img/04.jpg', 'A nice Image')}
        ${await this.respImg('./src/assets/img/06.jpg', 'A nice Image')}
        ${await this.respImg('./src/assets/img/03.jpg', 'A nice Image')}
      </div>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js" type="text/javascript"></script>
    </body>
    </html>
  `;
};