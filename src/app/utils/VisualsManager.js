import ContactService from "../services/ContactService.js";

export default class VisualsManager {
    constructor() {
        this.contactService = new ContactService();
        this.formCreateContent = document.querySelector('.content-form');
        this.formCreateContentTitle = this.formCreateContent.querySelector('h2');
    }

    configForm() {
        this.showForm();
        this.closeForm();
    }

    showForm() {
        const buttonCreate = document.getElementById('create-button');
        const buttonsUpdate = document.querySelectorAll('.edit-button');
        const createContact = document.getElementById('createContact');
        const updateContact = document.getElementById('updateContact');

        buttonCreate.addEventListener('click', () => {
            this.formCreateContent.classList.remove('d-none');
            createContact.classList.remove('d-none');
            updateContact.classList.add('d-none');
            this.formCreateContentTitle.textContent = "Registrar Contacto";
            document.getElementById('lookupName').value = '';
        })

        buttonsUpdate.forEach(buttonUpdate => {
            buttonUpdate.addEventListener('click', async () => {
                const row = buttonUpdate.parentNode.parentNode;
                this.formCreateContent.classList.remove('d-none');
                createContact.classList.add('d-none');
                updateContact.classList.remove('d-none');
                this.formCreateContentTitle.textContent = "Actualizar Contacto"

                const contactId = row.querySelector('th:nth-child(1)').textContent;
                
                const findContact = await this.contactService.getCustomContact(contactId);
                document.getElementById('lookupName').value = findContact.name.first;
                document.getElementById('lookupName2').value = findContact.name.last;
                document.getElementById('city').value = findContact.address.city;
                document.getElementById('id-contact').value = contactId;
            })
        });
    }

    closeForm() {
        const buttonClose = document.getElementById('close-form-create');
        buttonClose.addEventListener('click', () => {
            this.formCreateContent.classList.add('d-none');;
        })  
    }
}