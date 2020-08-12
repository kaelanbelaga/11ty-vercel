const Image = require("@11ty/eleventy-img");
const Sqip = require('sqip').default;

module.exports = function(eleventyConfig) {

  eleventyConfig.addJavaScriptFunction("respImg", async function(src, alt, options) {
    if(alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on myResponsiveImage from: ${src}`);
    }

    console.log('transforming ' + src)

    let stats = await Image(
      src, 
      {
        outputDir: 'dist/img',
        widths: [320, 640, 768, 1024, 1366, 1600, 1920],
        ...options
      });
    let lowestSrc = stats.jpeg[0];
    let sizes = "50vw"; // Make sure you customize this!

  
    let placeholder = await Sqip({
      input: 'dist' + stats.jpeg[0].url,
      output: 'dist/img',
      plugins: [
        {
          name: 'sqip-plugin-primitive',
          options: {
            numberOfPrimitives: 50,
            mode: 3,
          },
        },
        'sqip-plugin-svgo',
        'sqip-plugin-data-uri',
      ],
      ...options
    }).then(result => {return result}).catch(error => console.error(error))

    // Iterate over formats and widths
    return `<picture>

      ${Object.values(stats).map(imageFormat => {
        return `  <source type="image/${imageFormat[0].format}" data-srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}" sizes="${sizes}">`;
      }).join("\n")}
        <img
          alt="${alt}"
          src="${placeholder.metadata.dataURI}"
          data-src="${lowestSrc.url}"
          class="lazyload" 
          width="${placeholder.metadata.width}"
          height="${placeholder.metadata.height}"
        />
     
      </picture>`;
    });

  return {
    dir: {
      input: `src`,
      output: `dist`,
      data: `api`,
    },
  };
};
