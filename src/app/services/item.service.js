import httpService from "./http.service";

const itemEndpoint = "item/";

const itemService = {
  get: async () => {
    const { data } = await httpService.get(itemEndpoint);
    return data;
  },

  create: async (payload) => {
    const { data } = await httpService.put(itemEndpoint + payload._id, payload);
    return data;
  }
};

export default itemService;
