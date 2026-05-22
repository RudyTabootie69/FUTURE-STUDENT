import { useMemo, useState, useEffect } from "react";
import OnboardingNavigation from "@/components/OnboardingNavigation";
import { useWishlist } from "@/context/WishlistContext";
import { useOnboardingProfile } from "@/context/OnboardingProfileContext";
import { useNavigate } from "react-router-dom";
import { toString } from "@shared/types/course";
import { onboardingsteps, wishliststeps } from "../data/onboardingsteps";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate
} from '@floating-ui/react';

export default function OnboardingWishlist() {
  const navigate = useNavigate();
  const { wishlist, remove } = useWishlist();
  const { onboardingprogress, increment, decrement, setProgress } = useOnboardingProfile();

  const currentStep = onboardingsteps[onboardingprogress];
  const [target, setTarget] = useState<HTMLElement | null>(null);

  const { refs, floatingStyles, update } = useFloating({
    open: !!target,
    placement: currentStep.placement || "bottom",
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const step = onboardingsteps[onboardingprogress];
    const el = document.querySelector(step.target) as HTMLElement | null;

    refs.setReference(el);
    setTarget(el);
    requestAnimationFrame(() => {
      update();
    });
  }, [onboardingprogress, onboardingsteps, refs]);

  function handleNextClick() {
      switch (onboardingprogress) {

        case 7:
          increment();
          navigate("/onboarding/home")
          break;
        default:
          console.log("Unknown action: " + onboardingprogress);
          setProgress(7)
      }
      return;
  };

  function handlePrevClick() {
      switch (onboardingprogress) {

        case 7:
          decrement();
          navigate("/onboarding/home")
          break;
        
        default:
          console.log("Unknown action: " + onboardingprogress);
          setProgress(7)
      }
      return;
  };

  useEffect(() => {
    if (!wishliststeps.includes(onboardingprogress)) {
      setProgress(7);
    }
  }, [wishliststeps, onboardingprogress, setProgress]);
  
  return (
    <div className="min-h-screen bg-bg-soft">
      <OnboardingNavigation />

      {/* Header */}
      <div className="w-full h-[140px] bg-primary-blue flex items-center justify-start px-6 lg:px-36">
        <div >
          <h1 className="text-white text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-white text-sm">Courses you've saved for later</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8" id = "wishlist">
        <div className="bg-white border border-[#E9E8FC] rounded-2xl shadow-[0_11.963px_47.851px_0_rgba(49,133,252,0.20)] overflow-hidden">
          {/* Scrollable list */}
          <div className="h-[632px] overflow-y-auto">
            {wishlist.length === 0 ? (
              <div className="p-10 text-center text-grey-400">No courses saved yet.</div>
            ) : (
              <table className="w-full">
                <tbody className="divide-y divide-[#E9E8FC]">
                  {wishlist.map((course) => (
                    <tr key={toString(course)} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary-blue flex-shrink-0" />
                          <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <div className="space-y-1">
                              <div className="text-[#27273F]">{course.university}</div>
                              <div className="text-grey-400">{course.location}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-[#27273F]">{course.title}</div>
                              <div className="text-grey-400">{course.code}</div>
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="text-[#27273F]">Course Starts</div>
                              <div className="text-grey-400">{course.startDate}</div>
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="text-[#27273F]">Final Closing</div>
                              <div className="text-grey-400">{course.closingDate}</div>
                            </div>
                            <div className="text-right">
                              <button
                                onClick={() => remove(toString(course))}
                                className="px-3 py-2 text-sm border border-primary-blue text-primary-blue rounded-md hover:bg-blue-50"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
            <div
        ref={refs.setFloating}
        style={floatingStyles}
        className="z-50 w-72 rounded-xl bg-white p-4 text-black shadow-xl"

      >
        <h2 className="text-lg font-bold">
          {currentStep.title}
        </h2>

        <p className="mt-2 text-sm text-[#777]">
          {currentStep.description}
        </p>

        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrevClick}
            disabled={onboardingprogress === 0}
            className="rounded bg-primary-blue text-white px-3 py-1"
          >
            Back
          </button>
          
          {onboardingprogress < onboardingsteps.length - 1 ? (
            <button
              onClick={handleNextClick}
              className="rounded bg-primary-blue text-white px-3 py-1"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleNextClick}
              className="rounded bg-green-500 px-3 py-1"
            >
              Finish
            </button>
          )}
        </div>
    </div>
    </div>
  );
}
