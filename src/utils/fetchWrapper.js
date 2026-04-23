import { BadRequestError, ForbiddenError, NotFoundError } from "./errorTypes";
import { Cookies } from "react-cookie";

/**
 * @function handleResponse
 * @param {Object} response - The response object.
 * @description
 *   A handler for the fetch response Object
 * @return {Promise<T>} A promise containing the deserialized response body.
 * */
export async function handleResponse(response, customClientErrorHandler) {
  if (response.status === 401) {
    const error = new Error("Unauthorized");
    throw error;
  }

  if (customClientErrorHandler) {
    await customClientErrorHandler(response);
  }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(
      `There has been an error. Response status: ${response.status}`
    );
  }

  let res;
  try {
    res = await response.json();

    if (response.status === 400) {
      throw new BadRequestError(res.message);
    }

    if (response.status === 403) {
      throw new ForbiddenError(res.message);
    }

    if (response.status === 404) {
      throw new NotFoundError(res.message);
    }
  } catch (err) {
    // if the status is 204, trying to parse the body will throw an error, so we should catch
    // but do nothing
  }
  return res;
}

export async function fetchWrapper({
  method = "GET",
  url,
  body,
  contentType,
  ...additionalOptions
}) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const options = {
    ...additionalOptions,
    method: method,
    headers: {
      ...(additionalOptions.headers || {}),
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body && JSON.stringify(body), // body can be undefined, that's ok
  };

  const response = await fetch(url, options);
  return await handleResponse(response);
}
