import React, { useState, useEffect } from "react";
import { ViewMode, LanguageCode, UserRole, Destination, GeneratedItinerary } from "./types";
import { MOCK_DESTINATIONS } from "./data/mockData";
import { LANGUAGES_LIST } from "./data/translations";
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { SwipeBackWrapper } from "./components/SwipeBackWrapper";
import { HeroSlider } from "./components/HeroSlider";
import { LandmarksShowcase } from "./components/LandmarksShowcase";
import { DestinationsGrid } from "./components/DestinationsGrid";
import { DestinationDetailModal } from "./components/DestinationDetailModal";
import { InteractiveSaudiMap } from "./components/InteractiveSaudiMap";
import { InteractiveMapExplorer } from "./components/maps/InteractiveMapExplorer";
import { ExplorerRideView } from "./components/ride/ExplorerRideView";
import { UnifiedBookingsView } from "./components/bookings/UnifiedBookingsView";
import { AIAssistantView } from "./components/AIAssistantView";
import { AIHubView } from "./components/ai/AIHubView";
import { UnifiedServicesView } from "./components/UnifiedServicesView";
import { VisaPortalView } from "./components/VisaPortalView";
import { ProfileView } from "./components/ProfileView";
import { SettingsView } from "./components/SettingsView";
import { AuthView } from "./components/auth/AuthView";
import { RolePortals } from "./components/portals/RolePortals";
import { InvestorPortalView } from "./components/portals/InvestorPortalView";
import { EstablishmentPortalView } from "./components/portals/EstablishmentPortalView";
import { ServiceProviderPortalView } from "./components/portals/ServiceProviderPortalView";
import { MinistryPortalView } from "./components/portals/MinistryPortalView";
import { SuperAdminPortalView } from "./components/portals/SuperAdminPortalView";
import { Phase8GlobalHub } from "./components/global/Phase8GlobalHub";
import { BookingModal } from "./components/BookingModal";
import { Footer } from "./components/Footer";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>("home");
  const [viewHistory, setViewHistory] = useState<ViewMode[]>(["home"]);
  const [language, setLanguage] = useState<LanguageCode>("ar");
  const [userRole, setUserRole] = useState<UserRole>("tourist");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [selectedDestinationModal, setSelectedDestinationModal] = useState<Destination | null>(null);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>("");
  const [savedItineraries, setSavedItineraries] = useState<GeneratedItinerary[]>([]);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string | null>(null);
  const [rideInitialDest, setRideInitialDest] = useState<string>("");
  const [customBookings, setCustomBookings] = useState<any[]>([]);

  // Sync HTML dir attribute when language changes
  useEffect(() => {
    const langObj = LANGUAGES_LIST.find((l) => l.code === language) || LANGUAGES_LIST[0];
    document.documentElement.dir = langObj.dir;
    document.documentElement.lang = language;
  }, [language]);

  // Navigate to view and add to history
  const handleSelectView = (view: ViewMode, targetId?: string) => {
    if (targetId) {
      const dest = MOCK_DESTINATIONS.find((d) => d.id === targetId);
      if (dest) {
        setSelectedDestinationModal(dest);
        return;
      }
    }
    if (view !== currentView) {
      setViewHistory((prev) => [...prev, view]);
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Back navigation & Mobile swipe back
  const handleGoBack = () => {
    if (viewHistory.length > 1) {
      const newHistory = [...viewHistory];
      newHistory.pop();
      const prevView = newHistory[newHistory.length - 1];
      setViewHistory(newHistory);
      setCurrentView(prevView);
    } else {
      setCurrentView("home");
    }
  };

  // AI assistant search
  const handleSearchAI = (prompt: string) => {
    setAiInitialPrompt(prompt);
    handleSelectView("ai-assistant");
  };

  // Select destination for modal details
  const handleSelectDestination = (destId: string) => {
    const dest = MOCK_DESTINATIONS.find((d) => d.id === destId);
    if (dest) {
      setSelectedDestinationModal(dest);
    }
  };

  // Login role redirection
  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    handleSelectView("portal");
  };

  const currentLangObj = LANGUAGES_LIST.find((l) => l.code === language) || LANGUAGES_LIST[0];
  const dir = currentLangObj.dir as "rtl" | "ltr";

  return (
    <SwipeBackWrapper
      currentView={currentView}
      onGoBack={handleGoBack}
      canGoBack={viewHistory.length > 1}
      dir={dir}
    >
      <div className="min-h-screen bg-stone-50/80 font-sans text-stone-900 flex flex-col selection:bg-amber-300 selection:text-emerald-950">
        
        {/* Phase 8 Global Experience & Accessibility Controls */}
        <Phase8GlobalHub
          language={language}
          onNavigateView={handleSelectView}
          savedTripsCount={savedItineraries.length}
        />

        {/* Top Navigation Bar */}
        <TopBar
          currentView={currentView}
          onSelectView={handleSelectView}
          language={language}
          onSelectLanguage={setLanguage}
          userRole={userRole}
          onSelectRole={setUserRole}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          savedTripsCount={savedItineraries.length}
        />

        {/* Collapsible Accordion Sidebar Drawer */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentView={currentView}
          onSelectView={handleSelectView}
          userRole={userRole}
          onLogout={() => {
            setUserRole("tourist");
            handleSelectView("auth");
          }}
        />

        {/* Main View Router */}
        <main className="flex-1">
          {currentView === "home" && (
            <>
              <HeroSlider
                onSelectView={handleSelectView}
                language={language}
              />

              <LandmarksShowcase
                language={language}
                onSelectDestination={handleSelectDestination}
              />

              <DestinationsGrid
                language={language}
                onSelectDestination={handleSelectDestination}
                onOpenAiPlanner={(destName) =>
                  handleSearchAI(`خطط لي جدول رحلة 3 أيام في ${destName}`)
                }
              />

              <InteractiveSaudiMap
                language={language}
                onSelectDestination={handleSelectDestination}
                onGenerateAiItinerary={(destName) =>
                  handleSearchAI(`خطط لي جدول رحلة 3 أيام في ${destName}`)
                }
              />
            </>
          )}

          {currentView === "portal" && (
            <RolePortals
              userRole={userRole}
              onSelectRole={setUserRole}
              onSelectView={handleSelectView}
            />
          )}

          {currentView === "tourist-portal" && (
            <RolePortals
              userRole="tourist"
              onSelectRole={setUserRole}
              onSelectView={handleSelectView}
            />
          )}

          {currentView === "citizen-portal" && (
            <RolePortals
              userRole="citizen"
              onSelectRole={setUserRole}
              onSelectView={handleSelectView}
            />
          )}

          {currentView === "tourguide-portal" && (
            <RolePortals
              userRole="tour-guide"
              onSelectRole={setUserRole}
              onSelectView={handleSelectView}
            />
          )}

          {currentView === "investor-portal" && (
            <InvestorPortalView
              language={language}
              onNavigateView={handleSelectView}
            />
          )}

          {currentView === "establishment-portal" && (
            <EstablishmentPortalView
              language={language}
              onNavigateView={handleSelectView}
            />
          )}

          {currentView === "provider-portal" && (
            <ServiceProviderPortalView
              language={language}
              onNavigateView={handleSelectView}
            />
          )}

          {currentView === "ministry-portal" && (
            <MinistryPortalView
              language={language}
              onNavigateView={handleSelectView}
            />
          )}

          {currentView === "superadmin-portal" && (
            <SuperAdminPortalView
              language={language}
              onNavigateView={handleSelectView}
            />
          )}

          {currentView === "ai-hub" && (
            <AIHubView
              language={language}
              onGlobalLanguageChange={setLanguage}
              onNavigateView={handleSelectView}
              onSaveItinerary={(itinerary) =>
                setSavedItineraries((prev) => [itinerary, ...prev])
              }
            />
          )}

          {currentView === "ai-assistant" && (
            <AIAssistantView
              language={language}
              initialPrompt={aiInitialPrompt}
              onSaveItinerary={(itinerary) =>
                setSavedItineraries((prev) => [itinerary, ...prev])
              }
            />
          )}

          {currentView === "destinations" && (
            <DestinationsGrid
              language={language}
              onSelectDestination={handleSelectDestination}
              onOpenAiPlanner={(destName) =>
                handleSearchAI(`خطط لي جدول رحلة 3 أيام في ${destName}`)
              }
            />
          )}

          {currentView === "services" && (
            <UnifiedServicesView language={language} />
          )}

          {currentView === "map-explorer" && (
            <InteractiveMapExplorer
              language={language}
              onNavigateView={handleSelectView}
              onBookRideToLandmark={(landmarkName) => {
                setRideInitialDest(landmarkName);
                handleSelectView("explorer-ride");
              }}
              onBookServiceModal={(serviceName) => setSelectedServiceForBooking(serviceName)}
            />
          )}

          {currentView === "explorer-ride" && (
            <ExplorerRideView
              language={language}
              onNavigateView={handleSelectView}
              initialDestinationName={rideInitialDest}
              onSaveBookingToWallet={(newBooking) =>
                setCustomBookings((prev) => [newBooking, ...prev])
              }
            />
          )}

          {currentView === "bookings" && (
            <UnifiedBookingsView
              language={language}
              onNavigateView={handleSelectView}
              customBookings={customBookings}
            />
          )}

          {currentView === "visa-portal" && (
            <VisaPortalView language={language} />
          )}

          {currentView === "profile" && (
            <ProfileView
              savedItineraries={savedItineraries}
              onRemoveItinerary={(index) =>
                setSavedItineraries((prev) => prev.filter((_, i) => i !== index))
              }
              language={language}
            />
          )}

          {currentView === "settings" && (
            <SettingsView
              onSelectView={handleSelectView}
              language={language}
              onSelectLanguage={setLanguage}
            />
          )}

          {(currentView === "auth" || currentView === "register") && (
            <AuthView
              onSelectView={handleSelectView}
              onLoginSuccess={handleLoginSuccess}
              initialMode={currentView === "register" ? "register" : "login"}
            />
          )}

          {currentView === "password-recovery" && (
            <AuthView
              onSelectView={handleSelectView}
              onLoginSuccess={handleLoginSuccess}
              initialMode="forgot"
            />
          )}
        </main>

        {/* Destination Detail Modal */}
        {selectedDestinationModal && (
          <DestinationDetailModal
            destination={selectedDestinationModal}
            language={language}
            onClose={() => setSelectedDestinationModal(null)}
            onGenerateAiItinerary={(destName) =>
              handleSearchAI(`خطط لي جدول رحلة 3 أيام في ${destName}`)
            }
            onBookService={(serviceName) => setSelectedServiceForBooking(serviceName)}
            onNavigateView={handleSelectView}
          />
        )}

        {/* Direct Booking Modal Simulation */}
        {selectedServiceForBooking && (
          <BookingModal
            serviceName={selectedServiceForBooking}
            isOpen={!!selectedServiceForBooking}
            onClose={() => setSelectedServiceForBooking(null)}
          />
        )}

        {/* Footer */}
        <Footer language={language} onSelectView={handleSelectView} />

      </div>
    </SwipeBackWrapper>
  );
}
