export interface Admin{
   firstName: string | "",
   phoneNumber ?: string,
   lastName? : string | "",
   date_of_birth ?: string | "1990-01-01",
   image_url ?: string | "",
   role : string | "ADMIN",
   password : string |  "",
   gender ?: string |  "MALE",
   email ?: string;
}