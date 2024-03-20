class Group {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

}

class Contact {
    public name: string;
    public email: string;
    public phone: string;
    public group: string;

    constructor(name: string, email: string, phone: string, group: Group) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.group = group.name;
    }
}


class AddressBook {
    public contacts: Array<Contact> = [];

    public addContact: (contact: Contact) => void = (contact: Contact) => {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(contact.email)) {
            throw new Error("Invalid email format");
        }

        if (!contact.name || contact.name.trim() === "") {
            throw new Error("Name cannot be empty");
        }

        const phoneRegex: RegExp = /^\+963-9\d{8}$/;
        if (!contact.phone || !phoneRegex.test(contact.phone)) {
            throw new Error("Invalid syrian number format");
        }

        this.contacts.push(contact);
    }

    public findContactByName: (name: string) => Contact[] | undefined = (name: string) => {
        let matchedContacts: Contact[] = [];
        this.contacts.forEach(contact => {
            if (contact.name === name) {
                matchedContacts.push(contact);
            }
        });
        return matchedContacts;
    }



    public filterByGroup: (group: string) => Contact[] = (group: string) => {
        return this.contacts.filter((contact: Contact) => contact.group === group);
    }

    public sortByName: () => void = () => {
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    }


   
    public searchContacts: (searchTerm: string) => Contact[] = (searchTerm: string) => {
        const normalizedSearchTerm: string = searchTerm.toLowerCase();
        let matched :Contact[] = [];
       
        this.contacts.forEach((contact: Contact) =>{
            if(contact.name.toLowerCase().indexOf(normalizedSearchTerm) !== -1)
            {
                matched.push(contact);
            };
        });
        return matched;
        
    }

    public printContacts: () => void = () => {
        this.contacts.forEach(contact => {
            console.log(`Name: ${contact.name}`);
            console.log(`Email: ${contact.email}`);
            console.log(`Phone: ${contact.phone}`);
            console.log("-----");
        });
    }
}



//testing 

const addressBook: AddressBook = new AddressBook();
const group1: Group = new Group("Full Stack");

//valid name, phone, email
const contact0: Contact = new Contact("Bushra Younes", "bushra@example.com", "+963-912345678", group1);

//invalid syrian phone
const contact1: Contact = new Contact("John Doe", "johndoe@example.com", "456-789-0123", group1);


const contact2: Contact = new Contact(
    "Alice Smith",
    "alice.smith@invalid",
    "+963-912345678",
    group1
); // Invalid email


const contact3: Contact = new Contact("", "valid@email.com", "+963-912345678", group1); // Empty name

//valid name, phone, email
const contact4: Contact = new Contact("John Doe", "johndoe@example.com", "+963-987654321", group1);
const contact5: Contact = new Contact("Mc.John Stiven", "johndoe@example.com", "+963-977777777", group1);




addressBook.addContact(contact0);//valid name, phone, email

//not valid phone number
try {
    addressBook.addContact(contact1);
} catch (error: any) {
    console.log("Error adding contact:", error.message);
}

try {
    addressBook.addContact(contact2); // This will throw an error (invalid email)
} catch (error: any) {
    console.error("Error adding contact:", error.message);
}

try {
    addressBook.addContact(contact3); // This will throw an error (empty name)
} catch (error: any) {
    console.error("Error adding contact:", error.message);
}

try {
    addressBook.addContact(contact4); // This will not throw an error
    addressBook.addContact(contact5); // This will not throw an error
} catch (error: any) {
    console.error("Error adding contact:", error.message);
}



console.log("______________________");
console.log("Contacts:");
addressBook.printContacts();
console.log("______________________");



const searchResults: Contact[] = addressBook.searchContacts("john");
console.log("Search results (name containing 'john'):");
searchResults.forEach((contact) => console.log(`  >> ${contact.name}`+`  >> ${contact.phone}`));
