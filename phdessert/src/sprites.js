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

function cleanBase64(text) {
  return text.replace(/[^A-Za-z0-9+/=]/g, '');
}

function padBase64(text) {
  const remainder = text.length % 4;
  return remainder ? text + '='.repeat(4 - remainder) : text;
}

function base64ToBlobUrl(encoded, mimeType = 'image/avif') {
  const binary = atob(padBase64(cleanBase64(encoded)));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return URL.createObjectURL(new Blob([bytes], { type: mimeType }));
}

async function fetchAsset(paths) {
  const parts = await Promise.all(paths.map(async (path) => {
    const response = await fetch(path, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Unable to load image asset: ${path}`);
    return response.text();
  }));

  const encoded = parts.join('');
  if (!cleanBase64(encoded)) {
    throw new Error('Image asset is empty');
  }
  return base64ToBlobUrl(encoded, 'image/avif');
}

export async function loadSprites() {
  const [products, campaign] = await Promise.all([
    fetchAsset(SPRITE_CHUNKS.products),
    fetchAsset(SPRITE_CHUNKS.campaign)
  ]);
  return { products, campaign };
}

export { SPRITE_CHUNKS, cleanBase64, padBase64, base64ToBlobUrl };