# Secure Hospital System
This project contains a secure hospital system with limited functional performance, and security requirements for secure hospital management, user account management and secure transactions.<br/>

<img width="461" alt="image" src="https://user-images.githubusercontent.com/60153091/211433627-3cf23bfa-0d11-4abe-ba7f-2e3f476bcce4.png">

Users in the project are classified into two categories
## Internal Users
- Hospital Staff: They are responsbile for approving appointment requests, creating patient ercords, view the patient records, view diagnosis of the patients, view prescriptions, view labtest reports, cerate transaction requests and complete the transaction requests on approval from patient.
- Doctors: Responsible for viewing and updating patient records, create, update, and remove diagnosis information of patients; create prescription records and view lab test reports.
- Lab Staff: responsible for creating, updating, and deleting lab tests reports, view diagnosis, and approve or deny requests for tests received from patients upon verification of recommendation from doctor. A lab staff can approve the test request only if the test is recommended by the doctor in the diagnosis or else, he/she rejects the request.
- Insurance Staff: Responsbile for viewing and reviwing the insurance claim request, validate the claim request, approve, or deny the claim request, authorize funds dispersal.
- Administrator: Responsible for creating, modifying, viewing, and deleting employee records, authorize or decline transaction requests, create, view, maintain and delete all internal files; access system log files; and ensure smooth functioning of the hospital system.
## External Users
- Patients: Individuals can request an appointment with a particular doctor or a general appointment, view their records, view diagnosis, view medical prescriptions, request lab tests, view payments and transactions and request reports and statements.
## Secure Hospital System Functionalities
- Appointments and Visits: Project provides an interface for users to booking, authorization and viewing of appointments.
<img width="467" alt="image" src="https://user-images.githubusercontent.com/60153091/211429769-0cc8422c-ab0d-4735-8bd7-5897373125af.png">
<img width="461" alt="image" src="https://user-images.githubusercontent.com/60153091/211429861-beca2412-38ac-4efb-9f15-99e3ac683afc.png">

* Diagnosis: Project provides and interface for doctor to record and view of the diagnosis of the patient and schedule next appointment if required. 
<img width="467" alt="image" src="https://user-images.githubusercontent.com/60153091/211430147-f1fd528d-7650-4bde-9442-7efd28205c83.png">
<img width="469" alt="image" src="https://user-images.githubusercontent.com/60153091/211430173-ef45d010-93ef-4407-aa6b-914a998fa049.png">

+ Lab Tests: A doctor can recommend a lab test to a patient from their diagnosis and lab staff validates the lab test, performs, and release the results.
<img width="469" alt="image" src="https://user-images.githubusercontent.com/60153091/211430369-715097eb-ca58-4fdd-b303-373c416751d1.png">
<img width="469" alt="image" src="https://user-images.githubusercontent.com/60153091/211430401-04958de0-c89f-4220-b4c6-b468310af064.png">

- Insurance: A patient can claim the insurance and insurance staff authroizes the claim.
<img width="479" alt="image" src="https://user-images.githubusercontent.com/60153091/211430580-2ccdc17f-aaa0-4c51-9373-056537abac1d.png">

- Help & Support Center: Patient can raise a help request and they can can be viewed by hospital staff.
<img width="473" alt="image" src="https://user-images.githubusercontent.com/60153091/211430816-80965abc-3a0f-4c3f-bc16-badf5287ff88.png">

- Chatbot: A chatbot is implemented to help patients with their general quiries and helps in redirecting to appropriate web pages.
<img width="466" alt="image" src="https://user-images.githubusercontent.com/60153091/211430981-536cd3c6-1128-49a8-aaba-e64ff031e379.png">

- OTP Verification: A series of alphanumerical characters is automatically generated using Google SMTP server and is used to authenticate a user for the purpose of login or to view any transactions using a virtual keyboard.
<img width="469" alt="image" src="https://user-images.githubusercontent.com/60153091/211431439-aef3f843-a37f-4b5c-818c-9124a371f23c.png">

- Session Management: Application makes use of session management inorder to keep track of all of the data that is coming in and going out as a result of the function calls made by the user. Once the user is logged in, a session token is issued. If the user is inactive for 15 mins, the session expires and the user is logged out automatically. The token is required for every user request.
- Preventing Malicious Login: Inorder to prevent malicious login, a google recaptcha is integrated into the system.
<img width="468" alt="image" src="https://user-images.githubusercontent.com/60153091/211431810-3895e7a3-bd95-4bc6-88ac-5dcbc987b201.png">

- Public Key Certificate: Secure Hospital System uses a self-signed public key certificate for the web application which acts as a digitally signed document that serves to validate the sender's authorization and name. The digital document is generated and issued by a Firebase.

- Data Masking : Sensitive fields in the database, such as those containing customer data, hospital data and other sensitive information, was accomplished through the use of techniques such as data masking and hashing algorithms used by the program.

# Technologies Used
## Front End
- Angular 
- HTML
- CSS
- Bootstrap
- JavaScript
## Back End
- Spring Boot
- Java
- Java Services
- Rest API
## DataBase
- MySQL
