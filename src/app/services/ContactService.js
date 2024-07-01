import { createFetch, customFetch, customFetchById, deleteFetch, getCustomContact, updateFetch } from "../utils/customFetch.js";

export default class ContactService {
    async getContacts() {
        const contacts = await customFetch('GET');
        return contacts.items;
    }

    async getCustomContact(id) {
        const contact = await customFetchById('GET', id);
        return contact;
    }

    async getContactByPath(id, path) {
        const contact = await getCustomContact('GET', id, path);
        return contact;
    }

    async createContacts(data) {
        const response = await createFetch('POST', data)
        return response;
    }

    async updateContacts(data, idContact) {
        const response = await updateFetch('PATCH', data, idContact)
        return response;
    }

    async deleteContacts(id) {
        const contact = await deleteFetch('DELETE', id);
        return contact;
    } 
}