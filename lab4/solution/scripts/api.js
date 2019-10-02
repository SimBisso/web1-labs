const headers = {
    'Content-type' : 'application/json',
};

const POST_OPTIONS = {
    method: 'post',
    headers
};

const PUT_OPTIONS = {
    method: "put",
    headers
};

const DELETE_OPTIONS = {
    method: "delete"
};

export const apiGet = (url) => {
    return fetch(url)
        .then(res => res.json());
};

export const apiPost = async (url, content) => {
    const response = await fetch(url, { ...POST_OPTIONS, body: JSON.stringify(content)});
    return response.clone().json();
};

export const apiPut = async (url, content) => {
    return fetch(url, { PUT_OPTIONS, body: JSON.stringify(content)})
};

export const apiDelete = async (url) => {
    return fetch(url, DELETE_OPTIONS)
};
