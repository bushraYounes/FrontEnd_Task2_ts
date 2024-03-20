"use strict";
class Group {
    constructor(name) {
        this.name = name;
    }
}
class Contact {
    constructor(name, email, phone, group) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.group = group.name;
    }
}
class AddressBook {
    constructor() {
        this.contacts = [];
        this.addContact = (contact) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contact.email)) {
                throw new Error("Invalid email format");
            }
            if (!contact.name || contact.name.trim() === "") {
                throw new Error("Name cannot be empty");
            }
            const phoneRegex = /^\+963-9\d{8}$/;
            if (!contact.phone || !phoneRegex.test(contact.phone)) {
                throw new Error("Invalid syrian number format");
            }
            this.contacts.push(contact);
        };
        this.findContactByName = (name) => {
            let matchedContacts = [];
            this.contacts.forEach(contact => {
                if (contact.name === name) {
                    matchedContacts.push(contact);
                }
            });
            return matchedContacts;
        };
        this.filterByGroup = (group) => {
            return this.contacts.filter((contact) => contact.group === group);
        };
        this.sortByName = () => {
            this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        };
        this.searchContacts = (searchTerm) => {
            const normalizedSearchTerm = searchTerm.toLowerCase();
            let matched = [];
            this.contacts.forEach((contact) => {
                if (contact.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1) {
                    matched.push(contact);
                }
                ;
            });
            return matched;
        };
        this.printContacts = () => {
            this.contacts.forEach(contact => {
                console.log(`Name: ${contact.name}`);
                console.log(`Email: ${contact.email}`);
                console.log(`Phone: ${contact.phone}`);
                console.log("-----");
            });
        };
    }
}
//testing 
const addressBook = new AddressBook();
const group1 = new Group("Full Stack");
//valid name, phone, email
const contact0 = new Contact("Bushra Younes", "bushra@example.com", "+963-912345678", group1);
//invalid syrian phone
const contact1 = new Contact("John Doe", "johndoe@example.com", "456-789-0123", group1);
const contact2 = new Contact("Alice Smith", "alice.smith@invalid", "+963-912345678", group1); // Invalid email
const contact3 = new Contact("", "valid@email.com", "+963-912345678", group1); // Empty name
//valid name, phone, email
const contact4 = new Contact("John Doe", "johndoe@example.com", "+963-987654321", group1);
const contact5 = new Contact("Mc.John Stiven", "johndoe@example.com", "+963-977777777", group1);
addressBook.addContact(contact0); //valid name, phone, email
//not valid phone number
try {
    addressBook.addContact(contact1);
}
catch (error) {
    console.log("Error adding contact:", error.message);
}
try {
    addressBook.addContact(contact2); // This will throw an error (invalid email)
}
catch (error) {
    console.error("Error adding contact:", error.message);
}
try {
    addressBook.addContact(contact3); // This will throw an error (empty name)
}
catch (error) {
    console.error("Error adding contact:", error.message);
}
try {
    addressBook.addContact(contact4); // This will not throw an error
    addressBook.addContact(contact5); // This will not throw an error
}
catch (error) {
    console.error("Error adding contact:", error.message);
}
console.log("______________________");
console.log("Contacts:");
addressBook.printContacts();
console.log("______________________");
const searchResults = addressBook.searchContacts("john");
console.log("Search results (name containing 'john'):");
searchResults.forEach((contact) => console.log(`  >> ${contact.name}` + `  >> ${contact.phone}`));
