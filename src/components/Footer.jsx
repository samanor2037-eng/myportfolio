import React from 'react';

export default function Footer({ name, tagline }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>
        &copy; {currentYear} {name} &mdash; {tagline}.
        <br />
        Building practical digital solutions for real-world problems.
      </p>
    </footer>
  );
}
