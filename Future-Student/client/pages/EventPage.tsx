import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import type { Event } from "@/types/event";
import { toString } from "@/types/course";
import { useWishlist } from "@/context/WishlistContext";
import { useLocation } from "react-router-dom";

type State = {
  event: Event;
};

export default function EventPage() {
    const location = useLocation();
    const state = location.state as State | null
    
    if (!state.event) {
    return <p>No event provided</p>;
    }
    
    const event: Event = state.event
  
    return(
      <div>
        <p>Event: {event.title}</p>
      </div>
    );

}
