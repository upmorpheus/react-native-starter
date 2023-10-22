use std::net::{TcpListener, TcpStream};
use crate::http::Request;
use std::io::Read;
use std::convert::TryFrom;
use std::convert::TryInto;

pub struct Server{
    addr: String,
}

impl Server {
    pub fn new(addr: String)->Self{ // pub sets the function as public since mod are defaulted to private
        Self {
            addr: addr
        }
    }

//
    pub fn run(self){
        println!("Listening on {}", self.addr);

        let listener = TcpListener::bind(&self.addr).unwrap(); // passes reference to address
    
        // Infinite Loop // 'loop_name: can be used to give the loop a name
        loop{
            match listener.accept() {
                Ok((mut stream, _))=>{

                    let mut buffer:[u8; 1024] = [0; 1024];
 
                    match stream.read(&mut buffer){
                        Ok(_)=>{
                            println!("Received a request: {:?}", String::from_utf8_lossy(&buffer));

                            match Request::try_from(&buffer[..]){
                                Ok(request)=>{},
                                Err(e)=>{println!("Failed to Parse a request: {}", e);},
                            }
                            // let res: &Result<Request, _> = &buffer[..].try_into(); // Equiv to above

                        },
                        Err(e)=>{println!("Failed to read from connection: {}", e)},
                    }
                },
                Err(e)=>println!("Failed tt establish connection: {}", e),
            }

        }
    } 
}
