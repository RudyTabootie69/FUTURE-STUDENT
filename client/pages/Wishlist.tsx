import Navigation from "@/components/Navigation";
import { useWishlist } from "@/context/WishlistContext";
import { courseId } from "@/types/course";

export default function Wishlist() {
  const { wishlist, remove } = useWishlist();

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      {/* Header */}
      <div className="w-full h-[140px] bg-primary-blue flex items-center justify-start px-6 lg:px-36">
        <div>
          <h1 className="text-white text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-white text-sm">Courses you've saved for later</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        <div className="bg-white border border-[#E9E8FC] rounded-2xl shadow-[0_11.963px_47.851px_0_rgba(49,133,252,0.20)] overflow-hidden">
          {/* Scrollable list */}
          <div className="h-[632px] overflow-y-auto">
            {wishlist.length === 0 ? (
              <div className="p-10 text-center text-grey-400">No courses saved yet.</div>
            ) : (
              <table className="w-full">
                <tbody className="divide-y divide-[#E9E8FC]">
                  {wishlist.map((course) => (
                    <tr key={courseId(course)} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary-blue flex-shrink-0" />
                          <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <div className="space-y-1">
                              <div className="text-[#27273F]">{course.university}</div>
                              <div className="text-grey-400">{course.location}</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-[#27273F]">{course.degree}</div>
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
                                onClick={() => remove(courseId(course))}
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
    </div>
  );
}
