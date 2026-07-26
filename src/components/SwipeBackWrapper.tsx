import React, { useRef, useEffect } from "react";
import { ViewMode } from "../types";
import { ChevronRight, ChevronLeft, ArrowRight, ArrowLeft } from "lucide-react";

interface SwipeBackWrapperProps {
  children: React.ReactNode;
  currentView: ViewMode;
  onGoBack: () => void;
  canGoBack: boolean;
  dir: "rtl" | "ltr";
}

export const SwipeBackWrapper: React.FC<SwipeBackWrapperProps> = ({
  children,
  currentView,
  onGoBack,
  canGoBack,
  dir
}) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const scrollPositionsRef = useRef<Record<string, number>>({});

  // Save scroll position before changing view
  useEffect(() => {
    const handleScroll = () => {
      scrollPositionsRef.current[currentView] = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentView]);

  // Restore scroll position when entering a view
  useEffect(() => {
    const savedPos = scrollPositionsRef.current[currentView] || 0;
    window.scrollTo({ top: savedPos, behavior: "instant" as any });
  }, [currentView]);

  // Gesture handling: Swipe Back from edge
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!canGoBack) return;

    // Check if target is inside map, inputs, modals, or carousels
    const target = e.target as HTMLElement;
    if (
      target.closest("svg") ||
      target.closest("input") ||
      target.closest("textarea") ||
      target.closest(".no-swipe")
    ) {
      return;
    }

    const touch = e.touches[0];
    const screenWidth = window.innerWidth;
    const edgeThreshold = 40; // 40px from edge

    // In RTL, swipe back starts near right edge. In LTR, starts near left edge.
    const isRtl = dir === "rtl";
    const isNearEdge = isRtl
      ? touch.clientX >= screenWidth - edgeThreshold
      : touch.clientX <= edgeThreshold;

    if (isNearEdge) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !canGoBack) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    touchStartRef.current = null;

    // Check if horizontal swipe is dominant and sufficient distance (>70px)
    if (Math.abs(deltaY) < 50) {
      const isRtl = dir === "rtl";
      const isSwipeBackGesture = isRtl ? deltaX < -70 : deltaX > 70;

      if (isSwipeBackGesture) {
        onGoBack();
      }
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="min-h-screen flex flex-col"
    >
      {/* Breadcrumb / Back Bar for non-home views */}
      {currentView !== "home" && canGoBack && (
        <div className="bg-stone-50/80 border-b border-stone-200/80 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm">
            <button
              onClick={onGoBack}
              className="inline-flex items-center gap-2 font-semibold text-emerald-900 hover:text-emerald-700 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              {dir === "rtl" ? (
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              ) : (
                <ArrowLeft className="w-4 h-4 text-emerald-700" />
              )}
              <span>{dir === "rtl" ? "الرجوع للصفحة السابقة" : "Back to Previous Page"}</span>
            </button>

            <span className="text-stone-500 font-medium hidden sm:inline text-xs">
              {dir === "rtl" ? "يدعم إيماءة السحب للرجوع (Swipe Back)" : "Supports Edge Swipe Back gesture"}
            </span>
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>
    </div>
  );
};
