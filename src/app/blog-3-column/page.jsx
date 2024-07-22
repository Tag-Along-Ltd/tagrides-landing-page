import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import Blog3ColumnContent from '@/components/blog/Blog3ColumnContent';
import React from 'react';

export const metadata = {
    title: "Tag Rides - Ride-Sharing Service - Blog"
}

const Blog3Column = () => {
    return (
        <>
            <LayoutStyle7 breadCrumb="Blogs and Updates" title="Blog">
                <Blog3ColumnContent />
            </LayoutStyle7>
        </>
    );
};

export default Blog3Column;