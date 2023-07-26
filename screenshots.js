const puppeteer = require('puppeteer');
const devices = puppeteer.devices;
const path = require('path');
const fs = require('fs');

// Tableau des URL à capturer
const urls = [
  'https://hbzuxqc78728y1sb-32127058055.shopifypreview.com/products/pack-famille-deo-tous-types-de-cheveux?view=product-bundle',
  'https://hbzuxqc78728y1sb-32127058055.shopifypreview.com/products/pack-famille-deo-cheveux-gras-pellicules?view=product-bundle',
  'https://hbzuxqc78728y1sb-32127058055.shopifypreview.com/products/pack-famille-deo-cheveux-secs-abimes?view=product-bundle',
  'https://hbzuxqc78728y1sb-32127058055.shopifypreview.com/products/pack-famille-deo-cheveux-colores?view=product-bundle',
  'https://hbzuxqc78728y1sb-32127058055.shopifypreview.com/products/pack-famille-deo-cuir-chevelu-sensible?view=product-bundle'   
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