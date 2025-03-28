import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="text-center p-6 bg-gray-100">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Bizimlə Əlaqə</h2>
        <p>
          <Link href="tel:+994504710036">+994 50 471 00 36</Link> <br />
          <Link href="mailto:info@bigbun.az">info@bigbun.az</Link> <br />
          <Link
            href="http://www.bigbun.az"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.bigbun.az
          </Link>
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Bizə Qoşulun</h3>
        <p>
          <Link
            href="https://www.facebook.com/BIGBUN.AZ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook: BIGBUN.AZ
          </Link>{" "}
          <br />
          <Link
            href="https://www.instagram.com/bigbun.az"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram: @bigbun.az
          </Link>{" "}
          <br />
          <Link
            href="https://www.youtube.com/channel/UC"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </Link>{" "}
          <br />
          <Link
            href="https://wa.me/994504710036"
            target="_blank"
            rel="noopener noreferrer"
          >

              WhatsApp: 050 471 00 36

          </Link>
        </p>
      </div>
    </div>
  );
}
