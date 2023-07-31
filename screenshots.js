const puppeteer = require('puppeteer');
const devices = puppeteer.devices;
const path = require('path');
const fs = require('fs');

// Tableau des URL à capturer
const urls = [
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-shampoings-solides-tout-nu-tous-types-de-cheveux?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-shampoings-solides-tout-nu-tous-types-de-cheveux?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-nettoyants-visage-super-doux?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-nettoyants-visage-super-doux?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-gels-douche-sans-bouteille-avoine-amande-douce-1?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-demaquillants-efface-tout?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-soins-de-rasage-au-poil?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-soins-de-rasage-au-poil?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-dapres-shampoings-solides-cheveux-soyeux?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-dapres-shampoings-solides-cheveux-soyeux?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-demaquillants-efface-tout?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-gels-douche-sans-bouteille-abricot-karite?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-gels-douche-sans-bouteille-abricot-karite?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-gels-douche-sans-bouteille-avoine-amande-douce?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-gommages-corps-peau-neuve?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-gommages-corps-peau-neuve?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-gommages-visage-peau-radieuse?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-gommages-visage-peau-radieuse?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-nettoyants-masque-detox?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-nettoyants-masque-detox?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-savons-neutres-bebes-grands?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-savons-neutres-bebes-grands?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-savons-surgras-mains-toutes-douces?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-savons-surgras-mains-toutes-douces?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-savons-surgras-stop-mains-seches?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-savons-surgras-stop-mains-seches?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-shampoings-solides-tout-nu-cheveux-colores?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-shampoings-solides-tout-nu-cheveux-colores?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-shampoings-solides-tout-nu-cheveux-gras-pellicules?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-shampoings-solides-tout-nu-cheveux-gras-pellicules?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-shampoings-solides-tout-nu-cheveux-secs-abimes?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-shampoings-solides-tout-nu-cheveux-secs-abimes?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-shampoings-solides-tout-nu-cuir-chevelu-sensible?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-shampoings-solides-tout-nu-cuir-chevelu-sensible?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/duo-de-soins-lavants-intimes-doux-pour-le-minou?view=product-bundle',
  'https://15f84hokr5ogkg9q-32127058055.shopifypreview.com/products/trio-de-soins-lavants-intimes-doux-pour-le-minou?view=product-bundle'  
];


// Appareils à utiliser
const deviceNames = ['iPhone 6', 'Desktop'];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });

  for (const url of urls) {
    let productName = url.split('/').pop();
    productName = productName.replace(/[<>:"\\/|?*]+/g, '-');

    const urlObj = new URL(url);
    const viewName = urlObj.searchParams.get("view");

    for (const deviceName of deviceNames) {
      const screenshotDir = path.join('C:\\Users\\EdgardTroadec\\Documents\\js\\screenshots');
      const screenshotPath = path.join(screenshotDir, `${viewName}_${productName}_${deviceName}.jpg`);

      if (fs.existsSync(screenshotPath)) {
        console.log(`Screenshot already exists for ${url} with ${deviceName} at ${screenshotPath}`);
        continue;
      }

      const page = await browser.newPage();
      let redirectCount = 0;

      page.on('response', response => {
        const status = response.status();
        if (status >= 300 && status <= 399) {
          redirectCount++;
        }
      });

      try {
        if (redirectCount > 10) {
          throw new Error(`Too many redirects for ${url}`);
        }

        if (deviceName === 'Desktop') {
          await page.setViewport({ width: 1920, height: 1080 });
        } else {
          const device = devices[deviceName];
          await page.emulate(device);
        }

        await page.goto(url, { waitUntil: 'networkidle0' });

        await page.addStyleTag({
          content: `
            #bottom-sticky-product { display: none !important; }
            .admin-bar__page { display: none !important; }
            .smart_modal { display: none !important; }
            #new_overlay { display: none !important; }    
            #bottom-navigation { display: none !important; } 
          `
        });

        await page.evaluate(async () => {
          await new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 100;
            const timer = setInterval(() => {
              const scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if (totalHeight >= scrollHeight) {
                clearInterval(timer);
                resolve(true);
              }
            }, 100);
          });
        });

        await page.waitForTimeout(1000);

        fs.mkdirSync(screenshotDir, { recursive: true });

        await page.screenshot({ path: screenshotPath, fullPage: true });

        console.log(`Screenshot saved for ${url} with ${deviceName} to ${screenshotPath}`);

        await page.close();
      } catch (error) {
        console.error(`Skipping URL ${url} due to error: ${error.message}`);
        continue;
      }
    }
  }

  await browser.close();
})();