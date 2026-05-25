const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

fs.readdir(publicDir, (err, files) => {
  if (err) throw err;

  const pngFiles = files.filter(f => f.endsWith('.png'));

  pngFiles.forEach(file => {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file.replace('.png', '.webp'));

    sharp(inputPath)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => {
        console.log(`Converted ${file} to .webp`);
        fs.unlinkSync(inputPath); // delete old png
      })
      .catch(err => {
        console.error(`Error converting ${file}:`, err);
      });
  });
});
