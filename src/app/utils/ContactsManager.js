import { path } from "../constansts/path.js";
import { Contact } from "../models/contact.js";
import ContactService from "../services/ContactService.js";
import VisualsManager from "./visualsManager.js";


export default class ContactsManager {
    newContacts = [];
    objectContacts = [];

    constructor() {
        this.contactsService = new ContactService();
        this.visualsManager = new VisualsManager();
        this.paginate = 1;
    }

    async getContacts() {
        document.querySelector('.content-loader').classList.remove('d-none');
        document.querySelector('.alert').classList.remove('d-none');
        try {
            const contacts = await this.contactsService.getContacts();
            const customContactPromises = contacts.map(contact => this.contactsService.getCustomContact(contact.id));
            const newContacts = await Promise.all(customContactPromises);
            this.newContacts = newContacts;
            this.clearTable();
            this.objectContacts = []

            for (const contactNew of this.newContacts) {
                try {
                    let contactEmail = await this.contactsService.getContactByPath(contactNew.id, path.email);
                    var email = contactEmail.address;
                    let contactPhone = await this.contactsService.getContactByPath(contactNew.id, path.phone);
                    var phone = contactPhone.number;
                    const tr = this.createRow(contactObject);
                    table.append(tr);
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        phone = 'sin numero';
                        continue;
                    }
                }

                const contactObject = new Contact(contactNew.id, contactNew.lookupName, contactNew.address.city, email, phone);
                this.objectContacts.push(contactObject);
            }

            this.fillTable()

            document.querySelector('.content-loader').classList.add('d-none');
            document.querySelector('.alert').classList.add('d-none');

            return this.newContacts;
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }

    fillTable() {
        const table = document.querySelector('tbody');
        const paginateContacts = this.objectContacts.slice(this.paginate - 1, this.paginate - 2 + 10);

        paginateContacts.forEach(contact => {
            const tr = this.createRow(contact);
            table.append(tr);
        });
    }

    clearTable() {
        const table = document.querySelector('tbody');
        table.innerHTML = '';
    }


    createRow(newContact) {
        const thId = document.createElement('th');
        thId.setAttribute('scope', 'row');
        thId.textContent = newContact.id;

        const tdName = document.createElement('td');
        tdName.textContent = newContact.name;

        const tdCity = document.createElement('td');
        tdCity.textContent = newContact.city;

        const tdEmail = document.createElement('td');
        tdEmail.textContent = newContact.email;

        const tdPhone = document.createElement('td');
        tdPhone.textContent = newContact.phone;

        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add("delete-button", 'rounded-5', 'btn', 'btn-outline-danger');
        const iconDelete = document.createElement('ion-icon');
        iconDelete.setAttribute('name', 'trash-outline');
        buttonDelete.append(iconDelete);


        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add('edit-button', 'rounded-5', 'btn', 'btn-outline-primary');
        const iconEdit = document.createElement('ion-icon');
        iconEdit.setAttribute('name', 'create-outline');
        buttonEdit.append(iconEdit);

        const tdButtons = document.createElement('td');
        tdButtons.append(buttonDelete, buttonEdit);

        const tr = document.createElement('tr');
        tr.append(thId, tdName, tdCity, tdEmail, tdPhone, tdButtons);

        return tr;
    }

    createContacts() {
        const createContactSubmit = document.getElementById('createContact');
        createContactSubmit.addEventListener('click', async (e) => {
            e.preventDefault();
            const name = document.getElementById('lookupName').value;
            const lastName = document.getElementById('lookupName2').value;
            const city = document.getElementById('city').value;

            const objectContact = {
                "name": {
                    "first": name,
                    "last": lastName
                },
                "address": {
                    "city": city,
                    "postalCode": "02150",
                    "stateOrProvince": {
                        "lookupName": "MA"
                    },
                    "street": "123 Beacon Street"
                }
            }

            const response = await this.contactsService.createContacts(objectContact);
            if (response.status == 201) {
                Swal.fire(
                    'Completado',
                    'El contacto se registró con exito',
                    'success'
                )
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salio mal al registrar',
                    text: 'El contacto no se pudo registrar correctamente',
                })
            }

            this.closeForm();
        })
    }

    updateContacts() {
        const updateContactSubmit = document.getElementById('updateContact');
        updateContactSubmit.addEventListener('click', async (e) => {
            e.preventDefault();
            const name = document.getElementById('lookupName').value;
            const lastName = document.getElementById('lookupName2').value;
            const city = document.getElementById('city').value;
            const idContact = document.getElementById('id-contact').value;

            const updatedContact = this.objectContacts.filter(contact => contact.id == idContact);

            const objectContact = {
                "name": {
                    "first": name,
                    "last": lastName
                },
                "address": {
                    "city": city,
                    "postalCode": "02150",
                    "stateOrProvince": {
                        "lookupName": "MA"
                    },
                    "street": "123 Beacon Street"
                }
            }

            const newUpdatedContact = new Contact(updatedContact[0].id, name + ' ' + lastName, city, updatedContact[0].email, updatedContact[0].phone)
            const response = await this.contactsService.updateContacts(objectContact, idContact);

            if (response.status == 200) {
                Swal.fire(
                    'Completado',
                    'El contacto se actualizó con exito',
                    'success'
                )
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salio mal al actualizar',
                    text: 'El contacto no se pudo actualizar correctamente',
                })
            }

            const indexContact = this.objectContacts.findIndex(contact => contact.id == idContact);
            this.objectContacts.splice(indexContact, 1, newUpdatedContact);
            this.clearTable();
            this.fillTable();
            this.closeForm();
        })

    }

    deleteContact() {
        const buttonsDelete = document.querySelectorAll('.delete-button');
        buttonsDelete.forEach(buttonDelete => {
            buttonDelete.addEventListener('click', async () => {
                const row = buttonDelete.parentNode.parentNode;
                const contactId = row.querySelector('th:nth-child(1)').textContent;

                Swal.fire({
                    title: 'Seguro que quieres eliminar?',
                    text: "Se eliminaran de la lista todos los usuarios seleccionados",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const response = await this.contactsService.deleteContacts(contactId);
                        if (response.status == 200) {
                            Swal.fire(
                                'Empleado eliminado',
                                'El empleado se ha eliminado exitosamente',
                                'success'
                            )
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Algo salio mal al eliminar',
                                text: 'El contacto no se pudo eliminar correctamente',
                            })
                        }

                        const indexContact = this.objectContacts.findIndex(contact => contact.id == contactId);

                        this.objectContacts.splice(indexContact, 1);
                        this.clearTable();
                        this.fillTable();
                    }
                })
            })
        });
    }

    closeForm() {
        const form = document.querySelector('.content-form');
        form.classList.add('d-none')
    }

    prevPage() {
        const prevNext = document.getElementById('prev-page');
        prevNext.addEventListener('click', () => {
            if (this.paginate > 1) {
                this.paginate -= 10;
                this.clearTable();
                this.fillTable();
                this.visualsManager.showForm();
                this.deleteContact();
            }
        })
    }

    nextPage() {
        const buttonNext = document.getElementById('next-page');
        buttonNext.addEventListener('click', () => {
            if (this.paginate < 11) {
                this.paginate += 10;
                this.clearTable();
                this.fillTable();
                this.visualsManager.showForm()
                this.deleteContact()
            }
        })
    }
}
