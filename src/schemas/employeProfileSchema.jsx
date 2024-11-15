import * as Yup from "yup";
export const EmployeProfileSchema = Yup.object({
  image: Yup.mixed().required("Please upload a profile picture"),
  first_name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must be at most 25 characters")
    .required("Please enter first name"),
  last_name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(25, "Name must be at most 25 characters")
    .required("Please enter last name"),

  company_name: Yup.string()
    .min(4, "Company name must be at least 4 characters")
    .max(35, "Company name must be at most 35 characters")
    .required("Please enter your company name"),

  company_chief_executive: Yup.string()
    .min(3, "CEO name must be at least 3 characters")
    .max(25, "CEO name must be at most 25 characters")
    .required("Please enter the CEO name"),

  founded: Yup.date()
    // .min(1700, "Founded year must be after 1700")
    .max(new Date(), "Founded year cannot be in the future")
    .required("Please enter the founded year")
    .typeError("Please enter a valid year"),

  primary_industry: Yup.string()
    .min(4, "Primary industry must be at least 4 characters")
    .max(25, "Primary industry must be at most 25 characters")
    .required("Please enter your primary industry"),

  company_size: Yup.number()
    .min(1, "Company size must be at least 1")
    .required("Please enter the company size")
    .typeError("Please enter a valid number"),

  official_website: Yup.string()
    .url("Please enter a valid URL")
    .required("Please enter your official website"),

  branches_in_countries: Yup.string()
    .min(3, "Country must be at least 3 characters")
    .max(20, "Country name must be at most 20 characters")
    .required("Please enter the country"),
});
