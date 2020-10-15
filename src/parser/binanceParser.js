export default function(data) {
  let parsedData = JSON.parse(data);
  return {bids: parsedData.b, asks: parsedData.a}
}