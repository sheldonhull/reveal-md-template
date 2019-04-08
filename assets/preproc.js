
var enableFragments = true;
//https://github.com/csinva/csinva.github.io/blob/671e27d82b5940af8e4e25b1b16be24ade323c91/_notes/ref/qual_slides/preproc.js
//var fragmentFadePattern = /-\s|\d{1,2}\./i;

module.exports = (markdown, options) => new Promise((resolve, reject) => {
  const output = markdown.split("\n")
  /* NEW SLIDE WITH FOLLOWING MATCH (no support for vertical as I'm not using right now) */
  .map((line, index) => {
    if (!/\^#/.test(line) || index === 0)
      return line;
    const is_vertical = /#\^/.test(line);
    return ((
      is_vertical
      ? "\n---------------------------------------------------------------------------------\n"
      : "\n_____________________\n") + line.replace("#^", "#"));
  })
  /* Automatically Tag Each Bullet & Number List with fragment w/options like fade */
  .map((line, index) => {
    if (enableFragments == true) {
      if (/\^-\s|^\d{1,2}\.\s/i.test(line)) {
        // if(line[0] == '-'){  for bullets add fragment to fade in by default
        line = '\n<span class="fragment fade-in-then-semi-out">' + line + "</span>" + "\n";

        // }
      }
    }
    return line;
  }).join("\n");

  return resolve(output);
});
