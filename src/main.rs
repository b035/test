#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "hello"
}

fn main() {
    rocket::ignite().mount("/", routes![index]).launch();

    ws::listen("0.0.0.0:10000", |out| {
        move |msg| {
            println!("{msg}");
            out.send(msg)
        }
    }).unwrap();
}

