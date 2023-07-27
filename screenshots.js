const puppeteer = require('puppeteer');
const devices = puppeteer.devices;
const path = require('path');
const fs = require('fs');

// Tableau des URL à capturer
const urls = [
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/apres-shampoing-solide-cheveux-soyeux?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/bougie-bergamote-romarin?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/bougie-framboise-feve-tonka?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/carte-cadeau-de-100?view=gift-card',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/carte-cadeau-de-30?view=gift-card',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/carte-cadeau-de-50?view=gift-card',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/carte-cadeau-de-75?view=gift-card',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/carte-cadeau-unbottled?view=gift-card',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/cotons-lavables?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/demaquillant-efface-tout?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/demaquillant-efface-tout-et-ses-ecotons-lavables?view=product-bundle-accessoire',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/deodorant-fleuri-cheri?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/deodorant-menthe-ole?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-cheveux-merveilleux?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-de-bougies-vegetales-parfumees?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-de-deos-fleuri-cheri-menthe-ole?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-de-gels-douche-avoine-abricot?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-demaquillant-nettoyant-visage?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-de-maxi-gels-douche?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-de-savons-mains-surgras-et-leurs-porte-savons?view=product-bundle-accessoire',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-de-savons-surgras?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-douceur?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-gel-douche-abricot-soin-lavant-intime?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-gel-douche-avoine-soin-lavant-intime?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-gommage-corps-gel-douche-abricot?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-gommage-corps-gel-douche-avoine?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-gommages-visage-corps?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-mini-corps-cheveux?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-mini-corps-cheveux-et-la-recy-trousse?view=product-bundle-accessoire',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-nettoyants-detox-super-doux?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-shampoing-cheveux-colores-apres-shampoing?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-shampoing-cheveux-gras-apres-shampoing?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-shampoing-cheveux-secs-apres-shampoing?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-shampoing-cuir-chevelu-sensible-apres-shampoing?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/duo-shampoing-tout-type-de-cheveux-apres-shampoing?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/eco-trousse?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/eco-trousse-x3?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/gel-douche-avoine-et-son-eco-trousse?view=product-bundle-accessoire',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/gel-douche-avoine-et-son-porte-savon-magique?view=product-bundle-accessoire',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/gel-douche-sans-bouteille?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/gel-douche-sans-bouteille-abricot-karite?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/gels-douche-x2-soin-lavant-intime?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/gommage-corps-peau-neuve?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/gommage-visage-peau-radieuse?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/kit-dessai-gel-douche-abricot-karite-porte-savon-filet-malin?view=product-discovery-kit',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/kit-dessai-gel-douche-avoine-amande-douce-porte-savon-filet-malin?view=product-discovery-kit',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/kit-dessai-savon-neutre-bebes-grands-porte-savon-filet-malin?view=product-discovery-kit',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/kit-dessai-shampoing-cheveux-colores-porte-savon-filet-malin?view=product-discovery-kit',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/kit-dessai-shampoing-cheveux-gras-porte-savon-filet-malin?view=product-discovery-kit',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/kit-dessai-shampoing-cheveux-secs-porte-savon-filet-malin?view=product-discovery-kit',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/kit-dessai-shampoing-cuir-sensible-porte-savon-filet-malin?view=product-discovery-kit',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/kit-dessai-shampoing-porte-savon-filet-malin?view=product-discovery-kit',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/la-recy-trousse?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/maxi-gel-douche-abricot-karite?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/maxi-gel-douche-avoine-amande?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/maxi-savon-neutre-bebes-grands?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/nettoyant-masque-detox?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/nettoyant-visage-super-doux?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-demaquillant-nettoyant-super-doux-nettoyant-detox?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-abricot-karite?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-avoine-amande-douce?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-cheveux-colores?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-cheveux-gras-pellicules?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-cheveux-secs-abimes?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-cuir-chevelu-sensible?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-deo?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-deo-cheveux-colores?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-deo-cheveux-gras-pellicules?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-deo-cheveux-secs-abimes?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-deo-cuir-chevelu-sensible?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-deo-tous-types-de-cheveux?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-nombreuse?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-nombreuse-abricot-karite?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-nombreuse-avoine-amande-douce?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-nombreuse-cheveux-colores?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-nombreuse-cheveux-gras-pellicules?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-nombreuse-cheveux-secs-abimes?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-nombreuse-cuir-chevelu-sensible?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-nombreuse-tous-types-de-cheveux?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-tous-types-de-cheveux?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-gel-douche-abricot-intime-gommage?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-gel-douche-soin-intime-rasage?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-routine-visage-complete?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/porte-savon-en-gypse-naturel-ocre?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/porte-savon-en-gypse-naturel-terracotta?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/porte-savon-magique?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/porte-savon-magique-x3?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/sauve-savon?view=accessoires',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/savon-neutre-bebes-grands?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/savon-surgras-stop-mains-seches?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/shampoing-solide-et-son-eco-trousse?view=product-bundle-accessoire',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/shampoing-solide-et-son-filet-malin?view=product-bundle-accessoire',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/shampoing-solide-et-son-porte-savon-magique?view=product-bundle-accessoire',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/shampoing-solide-tout-nu?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/shampoing-solide-tout-nu-cheveux-colores?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/shampoing-solide-tout-nu-cheveux-gras?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/shampoing-solide-tout-nu-cheveux-secs?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/shampoing-solide-tout-nu-cuir-chevelu-sensible?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/trio-bye-bye-plastique?view=old',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/trio-bye-bye-plastique-et-ses-eco-trousses?view=product-bundle-accessoire',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/trio-bye-plastique-et-ses-porte-savons-magiques?view=product-bundle-accessoire',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/trio-demaquillant-nettoyant-gommage-visage?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/trio-de-maxi-gels-douche?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/trio-gels-douche-avoine-abricot-bebe?view=product-bundle',
  'https://kwyotkdwdvrs0j2v-32127058055.shopifypreview.com/products/pack-famille-deo-abricot-karite?view=product-bundle'
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