// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: "https://390b-2600-8800-1303-fd00-fdbf-bdee-83a4-f30e.ngrok.io",
  users:{
    base:"/user",
    list: "/users",
    login:"/login",
    registration: "/register",
    getUserById: "/getById",
    update:"/update",
    delete:"/delete",
    patients:"/patients",
    verifyCaptcha:"/verify",
    doctors:"/doctors",
    logout:"/logout"
  },
  prescription:{
    base:"/prescriptions",
    list:"/list",
    update: "/update",
    create: "/create",
    getByPatientId:"/listByPatientId",
    getByDoctorId:"/listByDoctorId"
  },
  diagnosis: {
    base: "/diagnosis",
    list:"/list",
    create:"/create",
    delete: "/delete",
    update:"/update",
    getByPatientId:"/listByPatientId"
  },
  labTests: {
    base: "/lab_tests",
    list:"/list",
    create:"/create",
    listBypatientId: "/listByPatientId",
    listByDoctorId:"/listByDoctorId",
    update:"/update",
    delete: "/delete",
    authorize:"/authorize"
  },
  appointments:{
    base:"/appointments",
    list:"/list",
    bookAppointment:"/makeAppointment",
    authorizeAppointment:"/authorize",
    deleteAppointment:"/delete",
    updateAppointment:"/update",
    getByPatientId:"/listByPatientId",
    getByDoctorId: "/getByDoctor"
  },
  transactions:{
    base:"/transactions",
    list:"/list",
    getBypatientId:"/listByPatientId",
    deleteTransaction:"/delete",
    createTransaction:"/create",
    authorizeTransaction:"/authorize",
    udpateTransaction:"/update"
  },
  log:{
    list:"/signInHistory"
  },
  email:{
    base:"/email",
    generateOtp:"/generateOtp",
    verifyOtp:"/validateOtp"
  },
  recaptcha:{
    api_uri:"https://www.google.com/recaptcha/api.js",
    siteKey:"6Ld-PjofAAAAAFVAMxw1CLEsw-Sq9DjA2yixp_NP"
  },
  help:{
    base:"/helpTable",
    createHelp:"/create",
    updateHelp:"/update",
    listHelp:"/list"
  },
  insurance:{
    base:"/insurance",
    getInsurance:"/listByPatientId",
    addInsurance:"/create",
    list:"/list"
  },
  insurancePolicy:{
    base:"/insurancePolicy",
    list:"/list",
    create:"/create"
  },
  insuranceClaim:{
    base:"/insuranceClaim",
    create:"/create",
    list:"/list",
    update: "/update"
  },
  bill:{
    base:"/bill",
    list:"/getBills",
    create:"/create",
    getByPatientId:"/getBillByPatientId"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
