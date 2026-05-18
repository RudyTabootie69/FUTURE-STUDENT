import { useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Event } from "@shared/types/event";
import { toString } from "@shared/types/course";
import { useWishlist } from "@/context/WishlistContext";
import { useLocation, useNavigate } from "react-router-dom";

type State = {
  event: Event;
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
    
  
    return(
      <div>
        <p>Event: {event.title}</p>
      </div>
    );

}
