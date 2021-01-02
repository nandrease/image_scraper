// list = document.querySelectorAll('#gallery')
// Array.from(list).map(item => item.href)
// copy(Array.from(document.querySelectorAll('#gallery')).map(item => item.href))
// copy(Array.from(document.querySelectorAll('.main table a')).map(item => item.href))

const imageDownloader = require('image-downloader');
const fs = require('fs');

const readImageData = () => {
  try {
    const rawdata = fs.readFileSync('images.json', 'utf8');
    return JSON.parse(rawdata);
  } catch (err) {
    console.error(err);
    return;
  }
};

const images = readImageData() || [];

const download = (imageUrl) => {
  const filename = imageUrl.split('/').pop();
  const prefix = process.argv.slice(2) || '';
  const options = {
    url: imageUrl,
    dest: './output/' + prefix + filename
  };

  imageDownloader
    .image(options)
    .then(({ filename }) => {
      console.log('file saved' + filename);
    })
    .catch((err) => console.error(err));
};

images.forEach((img) => download(img));
