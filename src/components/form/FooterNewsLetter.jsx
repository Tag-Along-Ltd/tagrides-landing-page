// "use client"
// import React from 'react';
// import { toast } from 'react-toastify';

// const FooterNewsLetter = () => {

//     const handleSubscribe = (event) => {
//         event.preventDefault()
//         event.target.reset()
//         toast.success("Thanks For Subscribe")
//     }

//     return (
//         <>
//             <form onSubmit={handleSubscribe}>
//                 <input type="email" placeholder="Your Email" className="form-control" name="email" autoComplete='off' required />
//                 <button type="submit"> Subscribe</button>
//             </form>
//         </>
//     );
// };

// export default FooterNewsLetter;

'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const FooterNewsLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: 'footer-newsletter',
        }),
      });

      if (response.ok) {
        toast.success('Thanks for subscribing!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Subscription failed. Please try again.');
    }

    setEmail('');
  };

  return (
    <>
      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Your Email"
          className="form-control"
          name="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
    </>
  );
};

export default FooterNewsLetter;
