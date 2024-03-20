Front End task2 ,         Bushra Younes,          Typescript syntax


Notes:

    -The step of converting ts  to  js : did not work properly without "npx tsc --declaration"
        due to different es versions, even though I changed the "target": "es2017" in the tsconfig.json file.    



    -I do add new Class called "Group":
        because i found "contact.group" in the provided file, without any clarification of what it is.



    -I put extra validation for syrian numbers. "_^



    -I change the implementation of "findContactByName" and "searchContacts" methods:
        because I kept getting these errors about the es version:
            /*
            Property 'find' does not exist on type 'Contact[]'.
            Do you need to change your target library? 
            Try changing the 'lib' compiler option to 'es2015' or later.
            */

            /*
            Property 'includes' does not exist on type 'string'.
            Do you need to change your target library? 
            Try changing the 'lib' compiler option to 'es2015' or later.
            */

___________________________________________________________________________________________________________________
