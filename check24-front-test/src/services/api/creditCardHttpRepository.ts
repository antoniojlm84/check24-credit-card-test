import { httpClient } from 'src/components/Axios';

export const creditCardHttpRepository = {
  getCreditCardsList,
  importCreditCards
};

interface QueryProps {
  q?: string;
  type?: string;
  page?: string;
  limit?: string;
  excluded?: string[];
  sort?: string;
}

async function getCreditCardsList(queryParams: QueryProps = {}) {
  let apiQueryParams = {};

  if (queryParams.q) {
    apiQueryParams = { ...apiQueryParams, ...{ q: queryParams.q } };
  }
  if (queryParams.page) {
    apiQueryParams = {
      ...apiQueryParams,
      ...{ 'page[number]': queryParams.page }
    };
  }
  if (queryParams.limit) {
    apiQueryParams = {
      ...apiQueryParams,
      ...{ 'page[size]': queryParams.limit }
    };
  }
  if (queryParams.sort) {
    apiQueryParams = { ...apiQueryParams, ...{ sort: queryParams.sort } };
  }

  return await httpClient
    .get(
      'api/credit-cards?' +
        (apiQueryParams ? new URLSearchParams(apiQueryParams).toString() : ''),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    .then(function (response) {
      if (200 == response.status) {
        return response.data;
      }

      return false;
    })
    .catch(function () {
      return false;
    });
}

async function importCreditCards() {
  return await httpClient
    .post(
      'api/credit-cards/import',
      {},
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    .then(function (response) {
      if (200 == response.status) {
        return response.data;
      }

      return false;
    })
    .catch(function () {
      return false;
    });
}
