import EventsIntroSection from "../components/EventsIntroSection.jsx";
import FindEventSection from "../components/FindEventSection.jsx";
import NewEventsSection from "../components/NewEventsSection.jsx";

export default function EventsPage() {
  return (
   <div className="min-h-screen">
      <EventsIntroSection />
      <NewEventsSection />
      <FindEventSection />
    </div>
  );
}
