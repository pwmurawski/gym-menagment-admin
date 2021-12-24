export default async function FetchApi(url, options, fnc) {
  const baseUrl = process.env.REACT_APP_DATABASE;

  try {
    const request = await fetch(`${baseUrl}${url}`, options);
    const res = await request.json();
    fnc(res);
  } catch (error) {
    if (!options.signal?.aborted) {
      // console.log(error);
    }
  }
}
