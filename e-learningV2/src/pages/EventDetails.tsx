import Wrapper from '../layouts/Wrapper';
import EventDetailsMain from '../components/inner-pages/events/event-details';
import SEO from '../components/SEO';

const EventDetails = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro Event Details'} />
         <EventDetailsMain />
      </Wrapper>
   );
};

export default EventDetails;