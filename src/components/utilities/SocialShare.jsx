import Link from 'next/link';
import React from 'react';

const SocialShare = () => {
    return (
        <>
            <li>
                <Link className="facebook" href="https://www.facebook.com/profile.php?id=61562880453833/" target="_blank">
                    <i className="fab fa-facebook-f"></i>
                </Link>
            </li>
            <li>
                <Link className="twitter" href="https://x.com/tagrides_/" target="_blank">
                    <i className="fab fa-twitter"></i>
                </Link>
            </li>
            {/* <li>
                <Link className="https://pinterest.com/" href="https://www.pinterest.com/" target="_blank">
                    <i className="fab fa-pinterest-p"></i>
                </Link>
            </li> */}
            <li>
                <Link className="linkedin" href="https://www.linkedin.com/company/104305162/" target="_blank">
                    <i className="fab fa-linkedin-in"></i>
                </Link>
            </li>
        </>
    );
};

export default SocialShare;