const SPRITE_CHUNKS = {
  products: [
    'assets/data/products-00.txt',
    'assets/data/products-01.txt',
    'assets/data/products-02.txt',
    'assets/data/products-03.txt',
    'assets/data/products-04.txt',
    'assets/data/products-05.txt',
    'assets/data/products-06.txt',
    'assets/data/products-07.txt',
    'assets/data/products-08.txt',
    'assets/data/products-09.txt',
    'assets/data/products-10.txt',
    'assets/data/products-11.txt'
  ],
  campaign: [
    'assets/data/campaign-00.txt',
    'assets/data/campaign-01.txt',
    'assets/data/campaign-02.txt'
  ]
};

function normaliseBase64(text) {
  let encoded = text.replace(/[^A-Za-z0-9+/=]/g, '').replace(/=+$/g, '');
  if (!encoded) throw new Error('Empty image asset');

  const remainder = encoded.length % 4;
  if (remainder === 1) {
    encoded = encoded.slice(0, -1);
  }
  while (encoded.length % 4 !== 0) encoded += '=';
  return encoded;
}

async function fetchAsset(paths) {
  const parts = await Promise.all(paths.map(async (path) => {
    const response = await fetch(path, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Unable to load image asset: ${path}`);
    return response.text();
  }));

  const encoded = normaliseBase64(parts.join(''));
  return `data:image/avif;base64,${encoded}`;
}

export async function loadSprites() {
  const [products, campaign] = await Promise.all([
    fetchAsset(SPRITE_CHUNKS.products),
    fetchAsset(SPRITE_CHUNKS.campaign)
  ]);
  return { products, campaign };
}

export { SPRITE_CHUNKS, normaliseBase64 };