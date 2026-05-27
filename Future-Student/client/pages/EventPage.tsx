import Navigation from "@/components/Navigation";
import { Event } from "@shared/types/event";
import { toString } from "@shared/types/course";
import { useWishlist } from "@/context/WishlistContext";
import { useLocation, useNavigate } from "react-router-dom";

type State = {
  event?: Event;
};

export default function EventPage() {
    const location = useLocation();
    const state = location.state as State | null
    const navigate = useNavigate();
    const testing = true;
    let event: Event;

    if(testing){
      event = Event.default 
    }else{
      if (!state.event) {
        navigate("*");
      }
      event = state.event
    }
    

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      <div className="w-full h-[140px] bg-primary-blue flex items-center justify-start px-6 lg:px-36">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">{event.title}</h1>
          <p className="text-white text-sm">
            {event.organiser}
            {event.location ? ` • ${event.location}` : ""}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        <div className="bg-white border border-[#E9E8FC] rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <p className="text-sm text-gray-500 mb-1">organiser</p>
              <p className="text-lg font-medium text-[#27273F]">
                {event.organiser}
              </p>
            </div>

            {event.date && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {event.date}
                </p>
              </div>
            )}

            {event.time && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Time</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {event.time}
                </p>
              </div>
            )}

            {event.location && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="text-lg font-medium text-[#27273F]">
                  {event.location}
                </p>
              </div>
            )}
          </div>

          {event.description && (
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-2">Event Description</p>
              <p className="text-[#27273F] leading-7">{event.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
