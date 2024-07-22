import Link from 'next/link';
import React from 'react';

const SocialShareStyle3 = () => {
    return (
        <>
            <li className="facebook">
                <Link href="https://www.facebook.com/profile.php?id=61562880453833/" target="_blank">
                    <i className="fab fa-facebook-f"></i>
                </Link>
            </li>
            <li className="twitter">
                <Link href="https://x.com/tagrides_" target="_blank">
                    <i className="fab fa-twitter"></i>
                </Link>
            </li>
            <li className="linkedin">
                <Link href="https://www.linkedin.com/company/104305162/" target="_blank">
                    <i className="fab fa-linkedin-in"></i>
                </Link>
            </li>
        </>
    );
};

export default SocialShareStyle3;