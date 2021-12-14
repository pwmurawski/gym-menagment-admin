export default async function FetchApi(url, options, fnc) {
  try {
    const request = await fetch(url, options);
    const res = await request.json();
    fnc(res);
  } catch (error) {
    if (!options.signal?.aborted) {
      // console.log(error);
    }
  }
}
