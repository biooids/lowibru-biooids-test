import React from "react";
import { Link } from "react-router-dom";

function EmailSent() {
  return (
    <div className="min-h-screen flex flex-col gap-3 pt-20   items-center">
      <p className="text-3xl">WSP BRO 😂!</p>
      <h2 className="text-2xl">
        We emailed a new placeholder for your password, use it to log in and
        please emediately update password.
      </h2>

      <Link to="/login" className="bg-slate-600 p-2 rounded-lg">
        Log in{" "}
      </Link>
    </div>
  );
}

export default EmailSent;
