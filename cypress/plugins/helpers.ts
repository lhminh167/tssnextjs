import percyHealthCheck from '@percy/cypress/task';
import Blob from 'cross-blob';
import FormData from "formdata-node";
import { promises } from 'fs';
import fetch from 'isomorphic-unfetch';
import path from 'path';
import { apiCustomerUrl } from '../../modules/customer/customer.model';
import { apiProductUrl, IProductFilterFilter } from '../../modules/product/filter/product-filter.model';
import { HttpMethod, IResponse, mediaUrl, UploadRequest } from '../../modules/shared/crud/crud.model';
import { setContentType } from '../../modules/shared/helpers/http.helper';
import { toUrl } from '../../modules/shared/helpers/string.helper';
import { defaultProduct, IProduct } from '../../modules/shared/models/product.model';
import { mockRandomCustomer, mockRootAdminAccount } from '../helpers/shared/helpers/auth.helper';
import { getRandomString } from '../helpers/shared/helpers/string.helper';
import { TEST_IMAGE } from '../helpers/shared/image/image.component.spec';

export async function saveCustomerLoginToken(config) {
  const user = mockRandomCustomer();
  const createRes = await post(user, apiCustomerUrl.register, config);
  config.env.CYPRESS_CUSTOMER_LOGIN_TOKEN = createRes.content.loginToken;

  const customerId = createRes.content.customer.customerId;
  const editContent = { ...mockRandomCustomer(), customerId };
  const updateRes = await put(editContent, apiCustomerUrl.detail(customerId), config, false);
  const getRes = await get(apiCustomerUrl.detail(customerId), config, false);

  config.env.CYPRESS_CUSTOMER = JSON.stringify({
    ...getRes.content,
    password: user.password
  });
}

export async function saveAdminLoginToken(config) {
  const user = mockRootAdminAccount();
  const res = await post(user, apiCustomerUrl.login, config);
  config.env.CYPRESS_ADMIN_LOGIN_TOKEN = res.content.loginToken;;
}

export async function saveProduct(config) {
  const filter: IResponse<IProductFilterFilter> = await get(apiProductUrl.filter, config);
  config.env.CYPRESS_PRODUCT_FILTER = JSON.stringify(filter.content);
  const buffer = await promises.readFile(path.join(__dirname, `../fixtures/${TEST_IMAGE}`));
  const file = new Blob([buffer]);
  const product: IProduct = {
    ...defaultProduct,
    name: getRandomString(5),
    description: getRandomString(5),
    discountedPrice: 99.5,
    price: 100.65,
    category: filter.content.categories[0],
    attributes: filter.content.attributes
  };
  const images = [
    { name: toUrl(product.name) + '-thumbnail', file },
    { name: toUrl(product.name), file },
    { name: toUrl(product.name) + '-2', file },
  ];

  const uploadRes = await upload(images, config);
  const createProductRes = await post({
    name: product.name.trim(),
    description: product.description.trim(),
    price: product.price,
    discountedPrice: product.discountedPrice,
    categoryId: filter.content.categories[0].categoryId,
    attributes: filter.content.attributes.map(e => e.attributeValueId),
    display: product.display,
    thumbnail: images[0].name,
    image: images[1].name,
    image2: images[2].name,
  }, apiProductUrl.product, config);
  const productRes = await get(apiProductUrl.product + '/' + createProductRes.content.productId, config)
  config.env.CYPRESS_EXISTING_PRODUCT = JSON.stringify(productRes.content);
}

async function getImageUploadAuthToken(input, config) {
  return await post(input, mediaUrl.imageUploadToken, config);
}

async function upload(input: UploadRequest[], config) {
  const uploadUrl = `https://api.cloudinary.com/v1_1/${config.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
  const tokenResponse = await getImageUploadAuthToken({
    content: input.map(entry => ({
      name: entry.name,
      settings: 'f_auto,w_auto,c_scale,q_auto,dpr_auto'
    }))
  }, config);
  const requests = input.map((entry, index) => {
    const fd = new FormData()

    fd.set('api_key', config.env.CLOUDINARY_API_KEY)
    fd.set('upload_preset', 'tss')
    fd.set('file', entry.file)
    fd.set('public_id', entry.name)
    fd.set('signature', tokenResponse.content[index].uploadToken)
    fd.set('timestamp', tokenResponse.content[index].creationTime)
    fd.set('eager', 'f_auto,w_auto,c_scale,q_auto,dpr_auto')

    const options = {
      method: HttpMethod.POST,
      body: fd.stream, // Set internal stream as request body
      headers: fd.headers // Set headers of the current FormData instance
    }
    //@ts-ignore
    const response = fetch(uploadUrl, options)
      .then(res => {
        if (!res.ok) console.log(`Failed to fetch data. URL: ${uploadUrl}; Method: ${options.method}; Status Code: ${res.statusText};`)
        return res.json();
      })
      .then(res => {
        return res
      })
      .catch(e => console.log(e));

    return response;
  });

  return Promise.all(requests);
}

async function callApi(url: string, options: RequestInit = {}, config, isAdmin: boolean = true) {
  options.headers = {};
  options.headers['Authorization'] = `Bearer ${isAdmin ? config.env.CYPRESS_ADMIN_LOGIN_TOKEN : config.env.CYPRESS_CUSTOMER_LOGIN_TOKEN}`;
  setContentType(options, 'application/json');

  const backendUrl = config.env.API_URL + url;
  const response = fetch(backendUrl, options)
    .then(res => {
      if (!res.ok) console.log(`Failed to fetch data. URL: ${backendUrl}; Method: ${options.method}; Status Code: ${res.statusText};`)
      return res.json();
    })
    .then(res => {
      if (res.status >= 300) console.log(res);
      return res
    })
    .catch(e => console.log(e));

  return response;
}

async function post(body, url, config) {
  return await callApi(
    url,
    {
      method: HttpMethod.POST,
      body: JSON.stringify(body)
    },
    config
  );
}

async function get(url, config, isAdmin: boolean = true) {
  return await callApi(
    url,
    {},
    config,
    isAdmin
  );
}

async function put(body, url, config, isAdmin: boolean = true) {
  return await callApi(
    url,
    {
      method: HttpMethod.PUT,
      body: JSON.stringify(body)
    },
    config,
    isAdmin
  );
}

export function percyHeathCheck(on, config) {
  // if (isProduction()) 
  on("task", percyHealthCheck);
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}