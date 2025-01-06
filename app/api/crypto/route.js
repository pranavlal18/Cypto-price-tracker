// app/api/crypto/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'bitcoin'; // Default to 'bitcoin'
  
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Crypto data not found');
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
