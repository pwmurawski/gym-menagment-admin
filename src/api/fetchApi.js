export default async function fetchApi(url, options) {
  const baseUrl = process.env.REACT_APP_DATABASE;
  let res;

  try {
    const request = await fetch(`${baseUrl}${url}`, options);
    res = await request.json();
  } catch (error) {
    if (!options.signal?.aborted) {
      // console.log(error);
    }
  }
  return res;
}
