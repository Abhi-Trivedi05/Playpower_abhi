import React, { useState } from 'react';
import Header from './components/Header';
import StickyNavHeader from './components/StickyNavHeader';
import PropertyHeader from './components/PropertyHeader';
import PhotoGallery from './components/PhotoGallery';
import HostBadge from './components/HostBadge';
import Highlights from './components/Highlights';
import Description from './components/Description';
import SleepingArrangements from './components/SleepingArrangements';
import Amenities from './components/Amenities';
import CalendarSection from './components/CalendarSection';
import ReservationCard from './components/ReservationCard';
import ReviewsSection from './components/ReviewsSection';
import LocationSection from './components/LocationSection';
import MeetHostSection from './components/MeetHostSection';
import ThingsToKnowSection from './components/ThingsToKnowSection';
import NearbyStays from './components/NearbyStays';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';

// Modals
import PhotoTourModal from './components/modals/PhotoTourModal';
import AmenitiesModal from './components/modals/AmenitiesModal';
import ReviewsModal from './components/modals/ReviewsModal';
import ShareModal from './components/modals/ShareModal';
import BookingModal from './components/modals/BookingModal';

import { listingData } from './data/listingData';

export default function App() {
  // Booking & Dates State
  const [checkIn, setCheckIn] = useState(listingData.defaultCheckIn);
  const [checkOut, setCheckOut] = useState(listingData.defaultCheckOut);
  const [dateSelectionPhase, setDateSelectionPhase] = useState('start'); // 'start' or 'end'

  // Promo & Wishlist State
  const [isClaimed, setIsClaimed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Guests State
  const [guestCounts, setGuestCounts] = useState({
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0
  });

  // Modals State
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [initialPhotoIndex, setInitialPhotoIndex] = useState(0);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Helper: calculate nights between dates
  const calculateNights = (inDate, outDate) => {
    if (!inDate || !outDate) return 5;
    const d1 = new Date(inDate);
    const d2 = new Date(outDate);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const totalNights = calculateNights(checkIn, checkOut);
  const rawTotal = totalNights * listingData.basePricePerNight;
  const totalPrice = isClaimed ? rawTotal * 0.9 : rawTotal;

  // Handle Calendar click
  const handleDateSelect = (dateStr) => {
    if (dateSelectionPhase === 'start' || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut('');
      setDateSelectionPhase('end');
    } else {
      if (dateStr > checkIn) {
        setCheckOut(dateStr);
        setDateSelectionPhase('start');
      } else {
        setCheckIn(dateStr);
        setCheckOut('');
        setDateSelectionPhase('end');
      }
    }
  };

  const handleClearDates = () => {
    setCheckIn('');
    setCheckOut('');
    setDateSelectionPhase('start');
  };

  // Toast Trigger
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Toggle Save
  const handleToggleSave = () => {
    const next = !isSaved;
    setIsSaved(next);
    triggerToast(next ? 'Saved to Wishlist!' : 'Removed from Wishlist');
  };

  // Toggle Claim Promo
  const handleToggleClaim = () => {
    const next = !isClaimed;
    setIsClaimed(next);
    triggerToast(next ? '10% discount applied!' : 'Discount removed');
  };

  // Update Guest counts
  const handleUpdateGuests = (type, delta) => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const openPhotoTour = (index = 0) => {
    setInitialPhotoIndex(index);
    setIsPhotoTourOpen(true);
  };

  return (
    <div className="airbnb-app-root">
      {/* Primary Site Header */}
      <Header />

      {/* Sticky Top Header on scroll */}
      <StickyNavHeader
        totalPrice={totalPrice}
        totalNights={totalNights}
        rating={listingData.rating}
        reviewCount={listingData.reviewCount}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      <main className="page-container">
        {/* Title and Top Share/Save Actions */}
        <PropertyHeader
          title={listingData.title}
          isSaved={isSaved}
          onToggleSave={handleToggleSave}
          onOpenShare={() => setIsShareOpen(true)}
        />

        {/* 5-Photo Hero Gallery */}
        <PhotoGallery
          images={listingData.heroImages}
          onOpenTour={openPhotoTour}
        />

        {/* Two-Column Layout */}
        <div className="listing-content-layout">
          {/* Left Column: Details */}
          <div className="listing-left-col">
            <HostBadge
              type={listingData.type}
              specs={listingData.specs}
              rating={listingData.rating}
              reviewCount={listingData.reviewCount}
              guestFavouriteText={listingData.guestFavouriteText}
              host={listingData.host}
            />

            <div className="listing-section-divider" />

            <Highlights highlights={listingData.highlights} />

            <div className="listing-section-divider" />

            <Description description={listingData.description} />

            <div className="listing-section-divider" />

            <SleepingArrangements arrangements={listingData.sleepingArrangements} />

            <div className="listing-section-divider" />

            <Amenities
              previewAmenities={listingData.previewAmenities}
              onOpenModal={() => setIsAmenitiesOpen(true)}
            />

            <div className="listing-section-divider" />

            <CalendarSection
              checkIn={checkIn}
              checkOut={checkOut}
              onDateSelect={handleDateSelect}
              onClearDates={handleClearDates}
              totalNights={totalNights}
            />
          </div>

          {/* Right Column: Sticky Reservation Card */}
          <div className="listing-right-col">
            <ReservationCard
              checkIn={checkIn}
              checkOut={checkOut}
              totalNights={totalNights}
              totalPrice={totalPrice}
              basePrice={listingData.basePricePerNight}
              cancellationDateText={listingData.cancellationDateText}
              isClaimed={isClaimed}
              onToggleClaim={handleToggleClaim}
              guestCounts={guestCounts}
              onUpdateGuests={handleUpdateGuests}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          </div>
        </div>

        <div className="listing-section-divider" />

        {/* Full-width Reviews Section */}
        <ReviewsSection
          reviewsData={listingData.reviewsBreakdown}
          allReviews={listingData.reviews}
          onOpenReviewsModal={() => setIsReviewsOpen(true)}
        />

        <div className="listing-section-divider" />

        {/* Location & Map Section */}
        <LocationSection location={listingData.location} />

        <div className="listing-section-divider" />

        {/* Meet Your Host Section */}
        <MeetHostSection host={listingData.host} />

        <div className="listing-section-divider" />

        {/* Things to Know */}
        <ThingsToKnowSection thingsToKnow={listingData.thingsToKnow} />

        <div className="listing-section-divider" />

        {/* More Stays Nearby */}
        <NearbyStays stays={listingData.nearbyStays} />
      </main>

      {/* Mobile Sticky Reservation Bottom Bar */}
      <MobileBottomBar
        totalPrice={totalPrice}
        totalNights={totalNights}
        basePrice={listingData.basePricePerNight}
        checkIn={checkIn}
        checkOut={checkOut}
        rating={listingData.rating}
        reviewCount={listingData.reviewCount}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <PhotoTourModal
        categories={listingData.photoTourCategories}
        isOpen={isPhotoTourOpen}
        onClose={() => setIsPhotoTourOpen(false)}
        initialCategoryIndex={initialPhotoIndex}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onOpenShare={() => setIsShareOpen(true)}
      />

      <AmenitiesModal
        isOpen={isAmenitiesOpen}
        onClose={() => setIsAmenitiesOpen(false)}
        categorizedAmenities={listingData.allAmenitiesCategorized}
      />

      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
        allReviews={listingData.reviews}
        reviewsData={listingData.reviewsBreakdown}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={listingData.title}
        imageUrl={listingData.heroImages[0].url}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        title={listingData.title}
        checkIn={checkIn || listingData.defaultCheckIn}
        checkOut={checkOut || listingData.defaultCheckOut}
        totalNights={totalNights}
        basePrice={listingData.basePricePerNight}
        isClaimed={isClaimed}
        guestCounts={guestCounts}
      />

      {/* Toast popup */}
      {toastMessage && (
        <div className="toast-notification" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
