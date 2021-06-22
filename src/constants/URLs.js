const BASE_URL = 'https://60d199dd5b017400178f3f54.mockapi.io/api';

export const GET_ALL_BLOG = `${BASE_URL}/blog`;
export const GET_BLOG = `${GET_ALL_BLOG}/:id`;
export const POST_BLOG = `${GET_ALL_BLOG}`;
export const PUT_BLOG = `${GET_BLOG}`;
export const DELETE_BLOG = `${GET_BLOG}`;
