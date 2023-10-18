use super::method::Method;
pub struct Request{
    path: String, 
    query_string: Option<String>, // Allows query string to be a null value // Since Option is a generic it can have any type 
    method: Method, // forces to use enum to only be one of the given values
} // super keyword tells the compiler ot look in the for the method in a higher level function
