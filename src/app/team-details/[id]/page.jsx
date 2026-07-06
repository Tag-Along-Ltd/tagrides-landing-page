import TeamDetailsContent from '@/components/team/TeamDetailsContent';
import React from 'react';
import TeamData from '@/assets/jsonData/team/TeamData.json';
import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';

export const metadata = {
    title: "Team Details — TagRides"
}

export function generateStaticParams() {
    return TeamData.map((team) => ({ id: String(team.id) }));
}

const TeamDetails = async ({ params }) => {

    const { id } = await params
    const data = TeamData.find(team => team.id === parseInt(id))

    return (
        <>
            <LayoutStyle7 breadCrumb="Team-details" title="Team Details">
                <TeamDetailsContent teamInfo={data} />
            </LayoutStyle7>
        </>
    );
};

export default TeamDetails;
