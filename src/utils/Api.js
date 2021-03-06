import config from "../config.json";

/******************************** IMAGES ***********************************/

export const uploadImage = async function (file) {
  try {
    const formData = new FormData();
    formData.append("image", file);
    let res = await fetch(config.server + "api/uploadimage", {
      method: "post",
      mode: "cors",
      credentials: "include",
      body: formData,
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteImage = async function (filename) {
  try {
    let res = await fetch(config.server + "api/deleteimage", {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        filename: filename,
      }),
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const featuredImages = async function () {
  try {
    let res = await fetch(config.server + "api/posts?featured=true", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/******************************** SITE ***********************************/

export const getAbout = async function () {
  try {
    let res = await fetch(config.server + "api/site/data/about", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    if (result === null || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateAbout = async function (content) {
  try {
    let res = await fetch(config.server + "api/site/data/about", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        lines: content,
      }),
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getStatement = async function () {
  try {
    let res = await fetch(config.server + "api/site/data/statement", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    if (result === null || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateStatement = async function (content) {
  try {
    let res = await fetch(config.server + "api/site/data/statement", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        lines: content,
      }),
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/******************************** EMAIL ***********************************/

export const sendEmail = async function (name, address, subject, content) {
  try {
    let res = await fetch(config.server + "api/email", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        subject: subject,
        text: content,
        email: address,
        name: name,
      }),
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/******************************** LOGIN ***********************************/

export const isLoggedIn = async function () {
  try {
    let res = await fetch(config.server + "api/isLoggedIn", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const logIn = async function (username, password) {
  try {
    let res = await fetch(config.server + "api/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const logOut = async function () {
  try {
    let res = await fetch(config.server + "api/logout", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/******************************** POSTS ***********************************/

export const createPost = async function (
  name,
  dimensions,
  meta,
  price,
  sold,
  date,
  filename,
  categories,
  vendor
) {
  try {
    let res = await fetch(config.server + "api/posts", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        dimensions: dimensions,
        meta: meta,
        price: price,
        sold: sold,
        date: date,
        filename: filename,
        categories: categories,
        vendor: vendor,
      }),
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPost = async function (id) {
  try {
    let res = await fetch(config.server + "api/posts/" + id, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    if (result === null || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPosts = async function (paginate, orderBy, tags) {
  try {
    let query = config.server + "api/posts";
    let params = [];
    if (paginate) params.push("paginate=" + paginate);
    if (orderBy) params.push("orderBy=" + orderBy);
    if (tags) {
      for (let i = 0; i < tags.length; i++) {
        params.push("tags=" + tags[i]);
      }
    }
    for (let i = 0; i < params.length; i++) {
      query += (i === 0 ? "?" : "&") + params[i];
    }
    console.log(query);
    let res = await fetch(query, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updatePost = async function (
  id,
  name,
  dimensions,
  meta,
  price,
  sold,
  date,
  filename,
  categories,
  featured,
  vendor
) {
  try {
    let res = await fetch(config.server + "api/posts/" + id, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        dimensions: dimensions,
        meta: meta,
        price: price,
        sold: sold,
        date: date,
        filename: filename,
        categories: categories,
        featured: featured,
        vendor: vendor,
      }),
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deletePost = async function (id) {
  try {
    let res = await fetch(config.server + "api/posts/" + id, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
    let result = await res.json();
    if (result === null || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/******************************** CATEGORIES ***********************************/

export const createCategory = async function (name) {
  try {
    let res = await fetch(config.server + "api/categories", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        category: name,
      }),
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateCategory = async function (id, name) {
  try {
    let res = await fetch(config.server + "api/categories/" + id, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        category: name,
      }),
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getCategories = async function () {
  try {
    let res = await fetch(config.server + "api/categories/", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    if (result === null || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getCategoriesByPost = async function (postId) {
  try {
    let res = await fetch(config.server + "api/categories?posts=" + postId, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    if (result === null || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteCategory = async function (id) {
  try {
    let res = await fetch(config.server + "api/categories/" + id, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
    let result = await res.json();
    if (result === null || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

/******************************** VENDORS ***********************************/

export const createVendor = async function (name, link, phone) {
  try {
    let res = await fetch(config.server + "api/vendors", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        link: link,
        phone: phone,
      }),
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateVendor = async function (id, name, link, phone) {
  try {
    let res = await fetch(config.server + "api/vendors/" + id, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        name: name,
        link: link,
        phone: phone,
      }),
    });
    let result = await res.json();
    if (!result || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getVendor = async function (id) {
  try {
    let res = await fetch(config.server + "api/vendors/" + id, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    if (result === null || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getVendors = async function () {
  try {
    let res = await fetch(config.server + "api/vendors/", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    if (result === null || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteVendor = async function (id) {
  try {
    let res = await fetch(config.server + "api/vendors/" + id, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });
    let result = await res.json();
    if (result === null || !result.success) {
      return false;
    }
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
};
