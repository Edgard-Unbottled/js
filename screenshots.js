const puppeteer = require('puppeteer');
const devices = puppeteer.devices;
const path = require('path');
const fs = require('fs');

// Tableau des URL à capturer
const urls = [
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-gommage-corps-gel-douche-abricot?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/pack-demaquillant-nettoyant-super-doux-nettoyant-detox?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/pack-famille-deo?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-de-deos-fleuri-cheri-menthe-ole?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/deodorant-menthe-ole?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/deodorant-fleuri-cheri?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/pack-gel-douche-abricot-intime-gommage?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-gommage-corps-gel-douche-avoine?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/pack-routine-visage-complete?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-douceur?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/pack-gel-douche-soin-intime-rasage?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/trio-gels-douche-avoine-abricot-bebe?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/kit-dessai-shampoing-cheveux-gras-porte-savon-filet-malin?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/kit-dessai-shampoing-cuir-sensible-porte-savon-filet-malin?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/kit-dessai-shampoing-porte-savon-filet-malin?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-shampoing-cheveux-colores-apres-shampoing?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-shampoing-cuir-chevelu-sensible-apres-shampoing?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/shampoing-solide-tout-nu-cuir-chevelu-sensible?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/shampoing-solide-tout-nu-cheveux-colores?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-nettoyants-detox-super-doux?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/nettoyant-masque-detox?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/savon-neutre-bebes-grands?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-de-bougies-vegetales-parfumees?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/bougie-framboise-feve-tonka?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/bougie-bergamote-romarin?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/cotons-lavables?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/trio-demaquillant-nettoyant-gommage-visage?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-demaquillant-nettoyant-visage?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/demaquillant-efface-tout?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-gommages-visage-corps?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/gommage-corps-peau-neuve?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/gommage-visage-peau-radieuse?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/gels-douche-x2-soin-lavant-intime?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-gel-douche-abricot-soin-lavant-intime?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-gel-douche-avoine-soin-lavant-intime?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/eco-trousse-x3?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/eco-trousse?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-shampoing-cheveux-secs-apres-shampoing?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-shampoing-cheveux-gras-apres-shampoing?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-shampoing-tout-type-de-cheveux-apres-shampoing?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/pack-famille?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/pack-famille-nombreuse?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/apres-shampoing-solide-cheveux-soyeux?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/porte-savon-en-gypse-naturel-terracotta?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/porte-savon-en-gypse-naturel-ocre?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-de-savons-mains-surgras-et-leurs-porte-savons?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-de-gels-douche-avoine-abricot?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/gel-douche-sans-bouteille-abricot-karite?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/shampoing-solide-tout-nu-cheveux-secs?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/shampoing-solide-tout-nu-cheveux-gras?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/la-recy-trousse?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/porte-savon-magique-x3?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/trio-de-maxi-gels-douche?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/maxi-savon-neutre-bebes-grands?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/porte-savon-magique?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/maxi-gel-douche-abricot-karite?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/maxi-gel-douche-avoine-amande?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/sauve-savon?view=accessoires',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/gel-douche-sans-bouteille?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/nettoyant-visage-super-doux?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/shampoing-solide-tout-nu?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/trio-bye-bye-plastique?view=old',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/gel-douche-avoine-et-son-porte-savon-magique?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/shampoing-solide-et-son-filet-malin?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/shampoing-solide-et-son-porte-savon-magique?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/trio-bye-plastique-et-ses-porte-savons-magiques?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-mini-corps-cheveux-et-la-recy-trousse?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/trio-bye-bye-plastique-et-ses-eco-trousses?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/demaquillant-efface-tout-et-ses-ecotons-lavables?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/shampoing-solide-et-son-eco-trousse?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/gel-douche-avoine-et-son-eco-trousse?view=product-bundle-accessoire',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-de-maxi-gels-douche?view=product-bundle',
  'https://xlsm5vwgvmty4u1h-32127058055.shopifypreview.com/products/duo-de-savons-surgras?view=product-bundle'   
];


// Appareils à utiliser
const deviceNames = ['iPhone 6', 'Desktop'];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });

  for (const url of urls) {
    // Extraire le nom du produit depuis l'URL et le nettoyer
    let productName = url.split('/').pop();
    productName = productName.replace(/[<>:"\\/|?*]+/g, '-');

    // Extraire la vue depuis l'URL
    const urlObj = new URL(url);
    const viewName = urlObj.searchParams.get("view");

    // Parcourir chaque appareil
    for (const deviceName of deviceNames) {
      const page = await browser.newPage();
      
      // Si le deviceName est 'Desktop', définir la fenêtre de visualisation manuellement
      if (deviceName === 'Desktop') {
        await page.setViewport({ width: 1920, height: 1080 });
      } else {
        // Sinon, émuler le device spécifié
        const device = devices[deviceName];
        await page.emulate(device);
      }

      await page.goto(url, { waitUntil: 'networkidle0' });

      // Masquer l'élément indésirable
      await page.addStyleTag({
        content: `
          #bottom-sticky-product { display: none !important; }
          .admin-bar__page { display: none !important; }
          .smart_modal { display: none !important; }
          #new_overlay { display: none !important; }    
          #bottom-navigation { display: none !important; } 
        `
      });

      // Scrolling pour forcer le chargement des éléments 'lazy-load'
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

      // Attendre un peu pour s'assurer que tout est chargé
      await page.waitForTimeout(1000);

      // Créer le dossier pour les captures d'écran si ce n'est pas déjà fait
      const screenshotDir = path.join('C:\\Users\\EdgardTroadec\\Documents\\js\\screenshots');
      fs.mkdirSync(screenshotDir, { recursive: true });

      // Include device name in screenshot file name
      const screenshotPath = path.join(screenshotDir, `${viewName}_${productName}_${deviceName}.jpg`);

      await page.screenshot({ path: screenshotPath, fullPage: true });

      console.log(`Screenshot saved for ${url} with ${deviceName} to ${screenshotPath}`);

      // Fermer la page après avoir fini pour économiser des ressources
      await page.close();
    }
  }

  await browser.close();
})();