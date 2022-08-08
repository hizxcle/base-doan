const AddApi = (link, data) => {
    var Option = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`http://localhost:2222/api/${link}`, Option);
};
const userApi = (endPoint, data) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`http://localhost:2222/api/user/${endPoint}/`, options);
};
const getData = async () => {
    const res = await fetch(`http://localhost:2222/api/product`);
    const reponse = await res.json();
    return reponse;
};
const getProductById = async (id) => {
    const res = await fetch(`http://localhost:2222/api/product/${id}`);
    const reponse = await res.json();
    return reponse;
};

const deleteApi = (link, id) => {
    const Option = {
        method: 'DELETE',
    };
    return fetch(`http://localhost:2222/api/${link}/${id}`, Option);
};

const updateApi = (link, id, data) => {
    var Option = {
        method: 'PUT',
        body: data,
    };
    return fetch(`http://localhost:2222/api/${link}/${id}`, Option);
};

const addProduct = (FormData) => {
    var Option = {
        method: 'POST',
        body: FormData,
    };
    return fetch(`http://localhost:2222/api/product`, Option);
};

//cart

const getCart = async (id) => {
    const res = await fetch(`http://localhost:2222/api/cart/getByUser/${id}`);
    const reponse = await res.json();
    return reponse;
};

const addToCart = async (userId, prodId, quantity) => {
    var Option = {
        method: 'POST',
    };
    const res = await fetch(
        `http://localhost:2222/api/cart/addNew/${userId}/${prodId}/${quantity}`,
        Option,
    );
    const reponse = await res.json();
    return reponse;
};

const deleteCartItem = (id, idProduct) => {
    var Option = {
        method: 'DELETE',
    };
    return fetch(
        `http://localhost:2222/api/cart/delete/${id}/${idProduct}`,
        Option,
    );
};

// User

const getUser = async () => {
    const res = await fetch(`http://localhost:2222/api/user/allUser`);
    const reponse = await res.json();
    return reponse;
};

const deleteUser = (link, id) => {
    const Option = {
        method: 'DELETE',
    };
    return fetch(`http://localhost:2222/api/user/${link}/${id}`, Option);
};

export {
    deleteUser,
    getData,
    AddApi,
    deleteApi,
    updateApi,
    addProduct,
    userApi,
    getCart,
    getProductById,
    addToCart,
    getUser,
    deleteCartItem,
};
