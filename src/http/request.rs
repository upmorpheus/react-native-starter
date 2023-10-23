use super::method::{Method, MethodError};
use std::convert::TryFrom;
use std::error::Error;
use std::fmt::{Result as FmtResult, Formatter, Display, Debug};
use std::str;
use std::str::Utf8Error;

pub struct Request<'buf>{
    path: &'buf str, 
    query_string: Option<&'buf str>, // Allows query string to be a null value // Since Option is a generic it can have any type 
    method: Method, // forces to use enum to only be one of the given values
} // super keyword tells the compiler ot look in the for the method in a higher level function

impl<'buf> Request <'buf>{
    pub fn path(&self) -> &str {
        &self.path
    }

    pub fn method(&self) -> &Method {
        &self.method
    }

    // pub fn query_string(&self) -> Option<&QueryString> {
    //     self.query_string.as_ref()
    // }
}

impl<'buf> TryFrom<&'buf [u8]> for Request<'buf> {
    type Error = ParseError;

    fn try_from(buf: &'buf [u8]) -> Result<Request<'buf>,Self::Error>{
        let request = str::from_utf8(buf) ?;

        let (method, request) = get_next_word(request).ok_or(ParseError::InvalidRequest)?;
        let (mut path, request) = get_next_word(request).ok_or(ParseError::InvalidRequest)?;  
        let (protocol, _) = get_next_word(request).ok_or(ParseError::InvalidRequest)?;
        
        if protocol != "HTTP/1.1"{
            return Err(ParseError::InvalidProtocol);
        }

        let method: Method = method.parse()?;

        let mut query_string = None;
        if let Some(i) = path.find('?'){
            query_string = Some(&path[i+1..]);
            path = &path[..i];
        }

        Ok(Self{
            path: path,
            query_string,
            method,
        })
     
    }
}

fn get_next_word(request: &str)-> Option<(&str, &str)>{

    for (i, c)  in request.chars().enumerate() {
        if c == ' ' || c == '\r' {
            return Some((&request[..i], &request[i+1..]));
        }
    }

    None
}

// Various Parsing Errors
pub enum ParseError {
    InvalidRequest,
    InvalidEncoding, 
    InvalidProtocol,
    InvalidMethod, 
}

impl ParseError {
    pub fn message(&self)->&str{
        match self{
            Self::InvalidRequest => "Invalid Request",
            Self::InvalidEncoding => "Invalid Encoding", 
            Self::InvalidProtocol => "Invalid Protocol",
            Self::InvalidMethod => "Invalid Method",
        }
    }
}

impl From<Utf8Error> for ParseError{
    fn from(_: Utf8Error)-> Self{
        Self::InvalidEncoding
    }
}

impl From<MethodError> for ParseError{
    fn from(_: MethodError)-> Self{
        Self::InvalidMethod
    }
}

impl Display for ParseError {
    fn fmt(&self, f: &mut Formatter) -> FmtResult {
        write!(f, "{}", self.message())
    }
}

impl Debug for ParseError {
    fn fmt(&self, f: &mut Formatter) -> FmtResult {
        write!(f, "{}", self.message())
    }
}

impl Error for ParseError {
    
}

