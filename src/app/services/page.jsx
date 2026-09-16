import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import ProcessStyle1 from '@/components/process/ProcessStyle1';
import RequestCallStyle1 from '@/components/request/RequestCallStyle1';
import ServicesStyle1 from '@/components/services/ServicesStyle1';
import TeamStyle1 from '@/components/team/TeamStyle1';

export const metadata = {
  title: 'Services — TagRides',
};

const ServicesPage = () => {
  return (
    <LayoutStyle7 breadCrumb="services" title="Our Services">
      <ServicesStyle1 />
      <ProcessStyle1 />
      <TeamStyle1 teamTitle={true} />
      <RequestCallStyle1 />
    </LayoutStyle7>
  );
};

export default ServicesPage;
