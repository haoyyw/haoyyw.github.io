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
    'assets/data/products-fix10-0.txt',
    'assets/data/products-fix10-1.txt',
    'assets/data/products-fix10-2.txt',
    'assets/data/products-fix10-3.txt',
    'assets/data/products-11.txt'
  ],
  campaign: [
    'assets/data/campaign-00.txt',
    'assets/data/campaign-01.txt',
    'assets/data/campaign-02.txt'
  ]
};

const PRODUCT_BASE64_LENGTH = 182984;
const PRODUCT_05_REPAIR_INDEX = 3725;
const PRODUCT_05_REPAIR_CHARACTER = 'n';

function cleanBase64(text) {
  return text.replace(/[^A-Za-z0-9+/=]/g, '');
}

function padBase64(text) {
  const remainder = text.length % 4;
  return remainder ? text + '='.repeat(4 - remainder) : text;
}

function base64ToBlobUrl(encoded, mimeType = 'image/avif') {
  const binary = atob(padBase64(encoded));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  const header = String.fromCharCode(...bytes.slice(4, 12));
  if (!header.includes('ftyp')) {
    throw new Error('Decoded image asset does not have a valid AVIF container header');
  }

  return URL.createObjectURL(new Blob([bytes], { type: mimeType }));
}

function repairProductChunk(path, text) {
  let cleaned = cleanBase64(text);

  // The originally published products-05 chunk lost exactly one Base64
  // character. Comparison against the validated source identifies the
  // missing character and position deterministically.
  if (path.endsWith('products-05.txt') && cleaned.length === 15999) {
    cleaned = cleaned.slice(0, PRODUCT_05_REPAIR_INDEX)
      + PRODUCT_05_REPAIR_CHARACTER
      + cleaned.slice(PRODUCT_05_REPAIR_INDEX);
  }

  return cleaned;
}

async function fetchAsset(paths, type) {
  const parts = await Promise.all(paths.map(async (path) => {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Unable to load image asset: ${path}`);
    const text = await response.text();
    return type === 'products' ? repairProductChunk(path, text) : cleanBase64(text);
  }));

  const encoded = parts.join('');
  if (!encoded) throw new Error('Image asset is empty');

  if (type === 'products' && encoded.length !== PRODUCT_BASE64_LENGTH) {
    throw new Error(`Product image data length mismatch: ${encoded.length}/${PRODUCT_BASE64_LENGTH}`);
  }

  return base64ToBlobUrl(encoded, 'image/avif');
}

export async function loadSprites() {
  const [products, campaign] = await Promise.all([
    fetchAsset(SPRITE_CHUNKS.products, 'products'),
    fetchAsset(SPRITE_CHUNKS.campaign, 'campaign')
  ]);
  return { products, campaign };
}

export {
  SPRITE_CHUNKS,
  PRODUCT_BASE64_LENGTH,
  PRODUCT_05_REPAIR_INDEX,
  PRODUCT_05_REPAIR_CHARACTER,
  cleanBase64,
  padBase64,
  base64ToBlobUrl,
  repairProductChunk
};