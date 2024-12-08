import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
        <p>© 2025 Удачная Касса 🎉. Все права защищены.</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.93 4.93 0 0 0 2.165-2.724 9.935 9.935 0 0 1-3.127 1.184A4.924 4.924 0 0 0 16.616 3c-2.724 0-4.93 2.21-4.93 4.928 0 .386.044.763.127 1.126C7.691 8.798 4.066 6.881 1.64 3.931a4.822 4.822 0 0 0-.666 2.475c0 1.71.869 3.218 2.188 4.103A4.903 4.903 0 0 1 .96 9.38v.062c0 2.386 1.693 4.374 3.946 4.827a4.907 4.907 0 0 1-2.224.084c.626 1.956 2.444 3.38 4.6 3.42a9.87 9.87 0 0 1-6.11 2.104c-.397 0-.789-.023-1.175-.067a13.94 13.94 0 0 0 7.548 2.211c9.057 0 14.009-7.498 14.009-13.986 0-.213-.005-.425-.014-.637A10.025 10.025 0 0 0 24 4.557z"></path>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
