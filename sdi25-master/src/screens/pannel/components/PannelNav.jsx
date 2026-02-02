// import Sdi_logo from "../../../src/assets/pannel/images/sdi_logo.svg";
import { Button, Navbar } from "flowbite-react";
import React from "react";
import "../pannel.scss";

export default function PannelNav() {
  return (
    <div className="navBar">
      <Navbar fluid rounded className="border-0 p-4 bg-transparent max-w-[1200px] mx-auto">
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            SDI
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button className="rounded-full mr-4 border-0 bg-blue-600">
            Get started
          </Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active href="#">
            Introduction au SI
          </Navbar.Link>
          <Navbar.Link href="#start">Informations sur le panel</Navbar.Link>
          <Navbar.Link href="#companies">Entreprises participantes</Navbar.Link>
          <Navbar.Link href="#sponsors">Sponsors</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
