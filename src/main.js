import ContactsManager from "./app/utils/ContactsManager.js";
import  VisualsManager  from "./app/utils/visualsManager.js";


class App {
    constructor() {
        this.contactsManager = new ContactsManager();
        this.visualsManager = new VisualsManager()
    }

    start() {
        this.getContacts();
        this.createContacts();
        this.updateContacts();
    }

    async getContacts() {
        this.contactsManager.getContacts().then(res => {
            this.configForm();
            this.deleteContact();
            this.prevPage();
            this.nextPage();
        });
    }

    createContacts() {
        this.contactsManager.createContacts();
    }

    updateContacts() {
        this.contactsManager.updateContacts();
    }

    deleteContact() {
        this.contactsManager.deleteContact();
    }

    configForm() {
        this.visualsManager.configForm();
    }

    nextPage() {
        this.contactsManager.nextPage();
    }

    prevPage() {
        this.contactsManager.prevPage();
    }
    
}

const app = new App();
app.start();