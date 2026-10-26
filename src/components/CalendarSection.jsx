import React from 'react';
import { ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';

export default function CalendarSection({
  checkIn,
  checkOut,
  onDateSelect,
  onClearDates,
  totalNights
}) {
  // Days of week header
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // October 2026: 31 days. Starts on Thursday (day index 4, where Sun=0)
  const octOffset = 4;
  const octTotalDays = 31;

  // November 2026: 30 days. Starts on Sunday (day index 0)
  const novOffset = 0;
  const novTotalDays = 30;

  const isSelected = (month, day) => {
    const formatted = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return formatted === checkIn || formatted === checkOut;
  };

  const isInRange = (month, day) => {
    if (!checkIn || !checkOut) return false;
    const current = `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return current > checkIn && current < checkOut;
  };

  const formatDateLabel = (isoDate) => {
    if (!isoDate) return '';
    const [y, m, d] = isoDate.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
  };

  return (
    <div className="calendar-section-wrap">
      <h3 className="calendar-headline">
        {totalNights > 0 ? `${totalNights} nights in Candolim` : 'Select dates'}
      </h3>
      <div className="calendar-sub-dates">
        {checkIn && checkOut
          ? `${formatDateLabel(checkIn)} - ${formatDateLabel(checkOut)}`
          : 'Add your travel dates for exact pricing'}
      </div>

      <div className="dual-calendar-container">
        {/* October 2026 */}
        <div className="month-table">
          <div className="month-header-row">
            <button className="cal-nav-btn" aria-label="Previous month">
              <ChevronLeft size={18} />
            </button>
            <div className="month-name">October 2026</div>
            <div style={{ width: '32px' }} />
          </div>

          <div className="weekdays-row">
            {weekdays.map((wd, i) => (
              <span key={i}>{wd}</span>
            ))}
          </div>

          <div className="days-grid">
            {/* Empty offset days */}
            {[...Array(octOffset)].map((_, i) => (
              <div key={`oct-empty-${i}`} className="day-cell empty" />
            ))}

            {/* Days 1 to 31 */}
            {[...Array(octTotalDays)].map((_, i) => {
              const day = i + 1;
              const dateStr = `2026-10-${String(day).padStart(2, '0')}`;
              const selected = isSelected(10, day);
              const inRange = isInRange(10, day);

              return (
                <div
                  key={`oct-${day}`}
                  className={`day-cell ${selected ? 'selected-endpoint' : ''} ${inRange ? 'in-range' : ''}`}
                  onClick={() => onDateSelect(dateStr)}
                  role="button"
                  tabIndex={0}
                  aria-label={`October ${day}, 2026`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* November 2026 */}
        <div className="month-table">
          <div className="month-header-row">
            <div style={{ width: '32px' }} />
            <div className="month-name">November 2026</div>
            <button className="cal-nav-btn" aria-label="Next month">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="weekdays-row">
            {weekdays.map((wd, i) => (
              <span key={i}>{wd}</span>
            ))}
          </div>

          <div className="days-grid">
            {/* Empty offset days */}
            {[...Array(novOffset)].map((_, i) => (
              <div key={`nov-empty-${i}`} className="day-cell empty" />
            ))}

            {/* Days 1 to 30 */}
            {[...Array(novTotalDays)].map((_, i) => {
              const day = i + 1;
              const dateStr = `2026-11-${String(day).padStart(2, '0')}`;
              const selected = isSelected(11, day);
              const inRange = isInRange(11, day);

              return (
                <div
                  key={`nov-${day}`}
                  className={`day-cell ${selected ? 'selected-endpoint' : ''} ${inRange ? 'in-range' : ''}`}
                  onClick={() => onDateSelect(dateStr)}
                  role="button"
                  tabIndex={0}
                  aria-label={`November ${day}, 2026`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="calendar-bottom-toolbar">
        <button className="cal-nav-btn" aria-label="Keyboard shortcuts" title="Keyboard shortcuts">
          <Keyboard size={18} />
        </button>
        <button className="clear-dates-btn" onClick={onClearDates}>
          Clear dates
        </button>
      </div>
    </div>
  );
}
