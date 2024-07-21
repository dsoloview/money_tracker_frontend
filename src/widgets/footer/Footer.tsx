import Container from "@/layouts/Container";
import logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-sm leading-6 mt-2 px-3 border-t border-zinc-400">
      <Container>
        <div className="pt-2 pb-28  sm:flex justify-between">
          <div className="mb-6 sm:mb-0 sm:flex">
            <p>Money Tracker. All rights reserced</p>
            <p className="sm:ml-4 sm:pl-4 sm:border-l">
              <a href="/brand">Support</a>
            </p>
          </div>
          <div className="flex space-x-10 text-slate-400">
            <Link to="/">
              <span className="sr-only">GitHub</span>
              <img src={logo} alt="" className="max-h-6" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
