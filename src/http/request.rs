use super::method::Method;
use std::convert::TryFrom;
use std::error::Error;
use std::fmt::{Result as FmtResult, Formatter, Display, Debug};
use std::str;
use std::str::Utf8Error;

pub struct Request{
    path: String, 
    query_string: Option<String>, // Allows query string to be a null value // Since Option is a generic it can have any type 
    method: Method, // forces to use enum to only be one of the given values
} // super keyword tells the compiler ot look in the for the method in a higher level function

impl Request{
    pub fn from_byte_array(buf: &[u8]) -> Result<Self, String>{ 
        unimplemented!()
    }
}

impl TryFrom<&[u8]> for Request {
    type Error = ParseError;

    fn try_from(buf: &[u8]) -> Result<Self, Self::Error>{
        let request = str::from_utf8(buf).or(Err(ParseError::InvalidEncoding))?;
        unimplemented!()
    }
}

fn get_next_word(request: &str)-> Option<(&str, &str)>{

    for (i, c)  in request.chars().enumerate() {
        if c == ' '{
            return Some((&request[..i], &request[i+1..]));
        }
    }

    unimplemented!()
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

