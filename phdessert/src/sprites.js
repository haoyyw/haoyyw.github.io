const SPRITE_CHUNKS = {'products': ['assets/data/products-00.txt', 'assets/data/products-01.txt', 'assets/data/products-02.txt', 'assets/data/products-03.txt', 'assets/data/products-04.txt', 'assets/data/products-05.txt', 'assets/data/products-06.txt', 'assets/data/products-07.txt', 'assets/data/products-08.txt', 'assets/data/products-09.txt', 'assets/data/products-10.txt', 'assets/data/products-11.txt'], 'campaign': ['assets/data/campaign-00.txt', 'assets/data/campaign-01.txt', 'assets/data/campaign-02.txt', 'assets/data/campaign-03.txt', 'assets/data/campaign-04.txt', 'assets/data/campaign-05.txt', 'assets/data/campaign-06.txt', 'assets/data/campaign-07.txt', 'assets/data/campaign-08.txt', 'assets/data/campaign-09.txt']};

async function fetchAsset(paths) {
  const parts = await Promise.all(paths.map(async (path) => {
    const response = await fetch(path, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`Unable to load image asset: ${path}`);
    return response.text();
  }));
  return `data:image/avif;base64,${parts.join('')}`;
}

export async function loadSprites() {
  const [products, campaign] = await Promise.all([fetchAsset(SPRITE_CHUNKS.products), fetchAsset(SPRITE_CHUNKS.campaign)]);
  return { products, campaign };
}

export { SPRITE_CHUNKS };
